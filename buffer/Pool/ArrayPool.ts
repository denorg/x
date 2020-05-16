import ConcurrentBag from "./ConcurrentBag.ts";

export default class ArrayPool<T> {
  private _objects: ConcurrentBag<T[]>;
  private _objectGenerator: () => T[];

  private _poolSize: number;

  public constructor(poolSize: number, objectGenerator?: () => T[]) {
    this._objects = new ConcurrentBag<T[]>();
    this._poolSize = poolSize;
    if (objectGenerator == undefined) {
      this._objectGenerator = () => new Array<T>(this._poolSize);
    } else {
      this._objectGenerator = objectGenerator;
    }
  }

  public GetObject(): T[] {
    let item: T[] | undefined = this._objects.TryTake();
    if (item != undefined) return item;
    return this._objectGenerator();
  }

  public PutObject(item: T[]) {
    this._objects.Add(item);
  }
}
