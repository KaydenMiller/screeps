export class CreepHelpers {
  public static getCreepsByRole(role: string): Creep[] {
    return _.filter(Game.creeps, (c) => c.memory.role == role);
  }

  public static getCreeps(): Creep[] {
    return _.filter(Game.creeps);
  }

  public static getCreepWithLeastTtl(creeps: Creep[]): Creep | null {
    let lowestTll: Creep | null = null;

    creeps.forEach(c => {
      if (c.ticksToLive === undefined) {
        // the creep is spawning
        return;
      }
      if (lowestTll === null) {
        lowestTll = c;
        return;
      }

      if (lowestTll?.ticksToLive !== undefined) {
        if (c.ticksToLive < lowestTll?.ticksToLive ?? 10000) {
          lowestTll = c;
          return;
        }
      }
    });

    return lowestTll;
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
