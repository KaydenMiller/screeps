export type EnergyFillableStructure = StructureContainer | StructureSpawn | StructureTower;

export class RoomHelpers {

  public static findRoomSpawn(room: Room): StructureSpawn {
    return room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return structure.structureType === STRUCTURE_SPAWN
      }
    })[0] as StructureSpawn;
  }

  public static findRoomController(room: Room): StructureController {
    return room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return structure.structureType === STRUCTURE_CONTROLLER
      }
    })[0] as StructureController;
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

  public static availableSpacesAroundPosition(pos: RoomPosition): number {
    return Game.rooms[pos.roomName].lookForAtArea(LOOK_TERRAIN, pos.y - 1, pos.x - 1, pos.y + 1, pos.x + 1, true)
      .filter(t => t.terrain === "plain" || t.terrain === "swamp")
      .length;
  }

  public static findSourcesInRoom(room: Room): Source[] {
    return room.find(FIND_SOURCES);
  }
}
