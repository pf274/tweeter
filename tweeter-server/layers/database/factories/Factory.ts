export abstract class Factory {
  [key: string]: any;
  protected getDAO<T>(attribute: string, daoClass: new () => T): T {
    if (this[attribute] === null) {
      this[attribute] = new daoClass();
    }
    return this[attribute];
  }
}
