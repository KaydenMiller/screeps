export class Linq {
  static min<T, O>(source: T[], map: (item: T) => O): T | null {
    let smallestValue: O;
    let smallestObject: T;

    if (source.length === 0) {
      return null;
    }
    smallestObject = source[0];
    smallestValue = map(smallestObject);

    source.forEach(item => {
      const current = map(item);
      if (current === undefined) {
        return;
      }
      if (current < smallestValue) {
        smallestValue = current;
        smallestObject = item;
      }
    })

    return smallestObject;
  }
}
