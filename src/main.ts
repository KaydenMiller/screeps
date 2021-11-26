import { ErrorMapper } from "utils/ErrorMapper";
import { CreepManager } from "tools/creep-manager";
import { RoomManager } from "./tools/room/room-manager";

declare global {
  interface SourceData {
    id: string;
    available_mining_positions: number;
    used_mining_positions: number;
  }

  interface RoomData {
    name: string;
    sources: SourceData[]
  }

  interface Rooms {
    roomData: RoomData[];
  }

  // Memory extension samples
  interface Memory extends Rooms {
    uuid: number;
    log: any;
  }

  interface CreepMemory {
    role: string;
    room: string;
    working: boolean;
  }

  // Syntax for adding properties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  RoomManager.run(Game.rooms["W32N23"]);
  CreepManager.CreateCreeps();
  CreepManager.Run();
  CreepManager.CleanUp();
});
