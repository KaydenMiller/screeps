import { Uuid } from "./uuid";

export const MAX_CREEPS = 5;
export const MAX_HARVESTERS = 3;
export const MIN_HARVESTERS = 1;
export const MIN_UPGRADERS = 1;
export const MAX_UPGRADERS = 1;
export const MIN_BUILDERS = 1;
export const MAX_BUILDERS = 1;

export class CreepFactory {
  constructor(private spawnerName: string) {
  }

  public create(type: "builder" | "upgrader" | "harvester" | "big-harvester"): any {
    switch (type) {
      case "harvester":
        Game.spawns[this.spawnerName].spawnCreep([WORK, CARRY, MOVE], `Harvester-${Uuid.create("v4")}`, {
          memory: {
            room: "none",
            role: "harvester",
            working: false
          }
        });
        break;
      case "upgrader":
        Game.spawns[this.spawnerName].spawnCreep([WORK, CARRY, MOVE], `Upgrader-${Uuid.create("v4")}`, {
          memory: {
            room: "none",
            role: "upgrader",
            working: false
          }
        });
        break;
      case "builder":
        Game.spawns[this.spawnerName].spawnCreep([WORK, CARRY, MOVE], `Builder-${Uuid.create("v4")}`, {
          memory: {
            room: "none",
            role: "builder",
            working: false
          }
        });
        break;
      case "big-harvester":
        Game.spawns[this.spawnerName].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
          `HarvesterBig-${Uuid.create("v4")}`,
          {
            memory: {
              room: "none",
              role: "harvester",
              working: false
            }
          });
        break;
    }
  }
}
