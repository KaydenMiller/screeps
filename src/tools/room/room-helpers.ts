export type EnergyFillableStructure = StructureContainer | StructureSpawn | StructureTower;

export class RoomHelpers {

  public static findRoomSpawn(room: Room): StructureSpawn {
    return room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return structure.structureType === STRUCTURE_SPAWN
      }
    })[0] as StructureSpawn;
  }

  public static findEnergyFillableStructures(room: Room): EnergyFillableStructure[] {
    return room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (
          structure.structureType === STRUCTURE_EXTENSION ||
          structure.structureType === STRUCTURE_SPAWN ||
          structure.structureType === STRUCTURE_TOWER
        );
      }
    });
  }

  public static findSourcesInRoom(room: Room): Source[] {
    return room.find(FIND_SOURCES);
  }
}
