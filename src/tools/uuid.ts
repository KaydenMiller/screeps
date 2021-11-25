export class Uuid {
  public static index: number = 0;
  public static tick: number = Game.time;
  public static shardid: boolean | string;

  static create(type: "v4" | "vs"): string {
    if(Game.shard) {
      let matches = Game.shard.name.match(/\d+$/);
      if (matches) {
        this.shardid = parseInt(matches[0]).toString(36);
      }
    }

    if (type === "v4") {
      return this.v4();
    }
    else if (type === "vs") {
      return this.vs();
    }
    else {
      throw new Error("Invalid Type Requested");
    }
  }

  static v4(): string {
    let result, i, j;
    result = '';
    for(j=0; j<32; j++) {
      if( j == 8 || j == 12|| j == 16|| j == 20) {
        result = result + '-';
      }
      i = Math.floor(Math.random()*16).toString(16).toUpperCase();
      result = result + i;
    }
    return result;
  }

  static vs(): string {
    if(Game.time != this.tick) {
      this.index = 0;
      this.tick = Game.time;
    }
    this.index++;
    let base = Game.time.toString(36) + this.leftpad(this.index.toString(36),3, '0');
    if(this.shardid !== false) {
      base = this.shardid + base;
    }
    return base;
  }

  static leftpad (str: string, len: number, ch: string) {
    let i = -1;
    if (!ch && ch !== '0') ch = ' ';
    len = len - str.length;
    while (++i < len) {
      str = ch + str;
    }
    return str;
  }
}
