export class MathHelpers {
  public static CalculateDistanceBetweenPoints(posA: RoomPosition, posB: RoomPosition): number {
    const a = Math.abs(posA.x - posB.x);
    const b = Math.abs(posA.y - posB.y);
    const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    return c;
  }

  public static getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
}
