import { RoomHelpers } from "./room-helpers";

export class RoomManager {
  static run(room: Room): void {
    this.buildRoadsBetweenSourcesAndSpawner(room);
    this.buildRoadsBetweenSpawnerAndController(room);
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
