import { Linq } from "../../utils/linq";
import { RoomHelpers } from "./room-helpers";

export class RoomManager {
  static run(room: Room): void {
    this.setupRoomMemory(room);

    // this.buildRoadsBetweenSourcesAndSpawner(room);
    // this.buildRoadsBetweenSpawnerAndController(room);
  }

  static setupRoomMemory(room: Room): void {
    if (!this.doesMemoryHaveRoom(room)) {
      const sources = Linq.map(RoomHelpers.findSourcesInRoom(room), s => {
        return {
          id: s.id.toString(),
          available_mining_positions: RoomHelpers.availableSpacesAroundPosition(s.pos),
          used_mining_positions: 0
        } as SourceData;
      });
      const roomData: RoomData = {
        name: room.name,
        sources: sources
      };

      Memory.roomData.push(roomData);
    }
  }

  static doesMemoryHaveRoom(room: Room): boolean {
    if (Memory.roomData === undefined) {
      Memory.roomData = [];
    }

    return Memory.roomData?.some(r => r.name === room.name) ?? false;
  }

  static buildRoadsBetweenSpawnerAndController(room: Room): void {
    const spawner = RoomHelpers.findRoomSpawn(room);
    const controller = RoomHelpers.findRoomController(room);
    this.buildRoadBetweenPoints(spawner.pos, controller.pos, room);
  }

  static buildRoadsBetweenSourcesAndSpawner(room: Room): void {
    const sources = RoomHelpers.findSourcesInRoom(room);
    const spawner = RoomHelpers.findRoomSpawn(room);
    sources.forEach(s => {
      this.buildRoadBetweenPoints(spawner.pos, s.pos, room);
    });
  }

  static buildRoadBetweenPoints(startPosition: RoomPosition, endPosition: RoomPosition, room: Room): void {
    const pathResponse = PathFinder.search(startPosition, endPosition);
    pathResponse.path.forEach(pos => {
      room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
    });
  }
}
