import { CreepHelpers } from "../tools/creep-helpers";
import { RoomHelpers } from "../tools/room/room-helpers";
import { HARVESTER_MINE_ENERGY_PATH_COLOR, HARVESTER_STORE_ENERGY_PATH_COLOR } from "../utils/colors";
import { Linq } from "../utils/linq";
import { MathHelpers } from "../utils/math-helpers";
import { Runnable, Runner } from "./runnable";

export class Harvester implements Runnable {
  run(): Runner {
    return this.runCreep;
  }

  private runCreep(creep: Creep): void {
    const sources = RoomHelpers.findSourcesInRoom(creep.room);

    if (CreepHelpers.doesCreepHaveStorageSpace(creep)) {
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: HARVESTER_MINE_ENERGY_PATH_COLOR } });
      }
    } else {
      // Creep is full on storage
      const targets = RoomHelpers.findEnergyFillableStructures(creep.room)
        .filter(s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: HARVESTER_STORE_ENERGY_PATH_COLOR } });
        }
      }
      else {
        const closestSource = Linq.min<Source, number>(sources, (s) => {
          return MathHelpers.CalculateDistanceBetweenPoints(creep.pos, s.pos);
        });

        if (closestSource !== null && closestSource.pos !== undefined) {
          const closestLength = MathHelpers.CalculateDistanceBetweenPoints(creep.pos, closestSource?.pos);
          console.log("Closest Source: ", closestSource, closestLength);

          if (closestLength < 3) {
            const pos: RoomPosition = new RoomPosition(
              MathHelpers.getRandomInt(creep.pos.x - 5, creep.pos.x + 5),
              MathHelpers.getRandomInt(creep.pos.y - 5, creep.pos.y + 5),
              "W32N23"
            );
            creep.moveTo(pos.x, pos.y, {
              visualizePathStyle: {
                stroke: HARVESTER_STORE_ENERGY_PATH_COLOR
              }
            });
          }
        }
      }
    }
  }

  private moveToRandomPosition(creep: Creep, sources: Source[]): void {
    const closestSource = Linq.min<Source, number>(sources, (s) => {
      return MathHelpers.CalculateDistanceBetweenPoints(creep.pos, s.pos);
    });

    if (closestSource !== null && closestSource.pos !== undefined) {
      const closestLength = MathHelpers.CalculateDistanceBetweenPoints(creep.pos, closestSource?.pos);
      console.log("Closest Source: ", closestSource, closestLength);

      if (closestLength < 3) {
        const pos: RoomPosition = new RoomPosition(
          MathHelpers.getRandomInt(creep.pos.x - 5, creep.pos.x + 5),
          MathHelpers.getRandomInt(creep.pos.y - 5, creep.pos.y + 5),
          "W32N23"
        );
        creep.moveTo(pos.x, pos.y, {
          visualizePathStyle: {
            stroke: HARVESTER_STORE_ENERGY_PATH_COLOR
          }
        });
      }
    }
  }
}

