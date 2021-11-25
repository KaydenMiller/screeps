export const MAX_CREEPS = 5;
export const MIN_HARVESTERS = 2;
export const MIN_UPGRADERS = 1;
export const MIN_BUILDERS = 1;

export class CreepFactory {
  private getCreepsByRole(role: string): Creep[] {
    return _.filter(Game.creeps, (c) => c.memory.role == role);
  }

  public getHarvesters(): Creep[] {
    return this.getCreepsByRole('harvester');
  }

  public getBuilders(): Creep[] {
    return this.getCreepsByRole('builder');
  }

  public getUpgraders(): Creep[] {
    return this.getCreepsByRole('upgrader');
  }

  public createRun(): void {
    for(let name in Memory.creeps) {
      if(!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
      }
    }

    if (this.getHarvesters().length < MIN_HARVESTERS) {
      this.create("harvester");
    }
  }

  public create(type: "builder" | "harvester" | "big-harvester"): any {


    switch (type) {
      case "harvester":
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Harvester1', {
          memory: {
            room: "none",
            role: "builder",
            working: false
          }
        });
        break;
      case "builder":
        break;
      case "big-harvester":
        Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],
          'HarvesterBig',
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
