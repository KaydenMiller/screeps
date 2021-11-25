import { Linq } from "../utils/linq";

export class CreepHelpers {
  public static getCreepsByRole(role: string): Creep[] {
    return _.filter(Game.creeps, (c) => c.memory.role == role);
  }

  public static getCreeps(): Creep[] {
    return _.filter(Game.creeps);
  }

  public static getCreepWithLeastTtl(creeps: Creep[]): Creep | null {
    let lowestTll: Creep | null = null;

    lowestTll = Linq.min<Creep, number | undefined>(creeps, c => c.ticksToLive);

    // creeps.forEach(c => {
    //   if (c.ticksToLive === undefined) {
    //     // the creep is spawning
    //     return;
    //   }
    //   if (lowestTll === null) {
    //     lowestTll = c;
    //     return;
    //   }
    //
    //   if (lowestTll?.ticksToLive !== undefined) {
    //     if (c.ticksToLive < lowestTll?.ticksToLive ?? 10000) {
    //       lowestTll = c;
    //       return;
    //     }
    //   }
    // });

    return lowestTll;
  }

  public static isCreepStorageFull(creep: Creep, storageType?: undefined): boolean {
    return creep.store.getFreeCapacity(storageType) <= 0;
  }

  public static doesCreepHaveStorageSpace(creep: Creep, storageType?: undefined): boolean {
    return creep.store.getFreeCapacity(storageType) > 0;
  }

  public static isCreepStorageEmpty(creep: Creep, storageType?: undefined): boolean {
    return creep.store.getFreeCapacity(storageType) === creep.store.getCapacity(storageType);
  }

  public static getHarvesters(): Creep[] {
    return this.getCreepsByRole('harvester');
  }

  public static getBuilders(): Creep[] {
    return this.getCreepsByRole('builder');
  }

  public static getUpgraders(): Creep[] {
    return this.getCreepsByRole('upgrader');
  }

}
