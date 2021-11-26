import { Builder } from "../roles/builder";
import { Harvester } from "../roles/harvester";
import { Upgrader } from "../roles/upgrader";
import {
  CreepFactory, MAX_BUILDERS, MAX_CREEPS,
  MAX_HARVESTERS,
  MAX_UPGRADERS,
  MIN_BUILDERS,
  MIN_HARVESTERS,
  MIN_UPGRADERS
} from "./creep-factory";
import { CreepHelpers } from "./creep-helpers";

export class CreepManager {
  static CreateCreeps(): void {
    const creepFactory = new CreepFactory("Beginnings");
    const harvestersCount = CreepHelpers.getHarvesters().length;
    const upgraderCount = CreepHelpers.getUpgraders().length;
    const builderCount = CreepHelpers.getBuilders().length;
    const creepCount = CreepHelpers.getCreeps().length;

    if (harvestersCount > MAX_HARVESTERS) {
      if (upgraderCount < MIN_UPGRADERS) {
        console.log("Killing harvester to create room for upgrader!");
        const harvesters = CreepHelpers.getHarvesters();
        CreepHelpers.getCreepWithLeastTtl(harvesters)?.suicide();
      } else if (builderCount < MIN_BUILDERS) {
        console.log("Killing harvester to create room for builder!");
        const harvesters = CreepHelpers.getHarvesters();
        CreepHelpers.getCreepWithLeastTtl(harvesters)?.suicide();
      }
    }

    // If count of creeps is less then the max we will allow a creep to be made
    if (creepCount < MAX_CREEPS) {
      if (harvestersCount < MAX_HARVESTERS) {
        console.log("Attempting to create harvester", harvestersCount);
        creepFactory.create("harvester");
      } else if (upgraderCount < MAX_UPGRADERS) {
        console.log("Attempting to create upgrader", upgraderCount);
        creepFactory.create("upgrader");
      } else if (builderCount < MAX_BUILDERS) {
        console.log("Attempting to create builder", builderCount);
        creepFactory.create("builder");
      }
    }
  }

  static CleanUp(): void {
    // Automatically delete memory of missing creeps
    for (const name in Memory.creeps) {
      if (!(name in Game.creeps)) {
        delete Memory.creeps[name];
      }
    }
  }

  static Run(): void {
    for (let creepName in Game.creeps) {
      const creep = Game.creeps[creepName];
      if (creep.memory.role == "harvester") {
        (new Harvester()).run()(creep);
      }
      if (creep.memory.role == "upgrader") {
        (new Upgrader()).run()(creep);
      }
      if (creep.memory.role == "builder") {
        (new Builder()).run()(creep);
      }
    }
  }
}
