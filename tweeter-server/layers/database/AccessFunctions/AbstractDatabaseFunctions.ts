export interface TableEntry {
  attributeName: string;
  attributeValue: string;
  secondaryAttributeName?: string;
  secondaryAttributeValue?: string;
}
export interface SaveEntry extends TableEntry {
  data: object;
}

export abstract class AbstractDatabaseFunctions {
  protected tableName: string;
  constructor(tableName: string) {
    this.tableName = tableName;
  }
  abstract save(attributeName: string, attributeValue: string, data: object): Promise<void>;
  abstract get(
    attributeName: string,
    attributeValue: string,
    secondaryAttributeName?: string,
    secondaryAttributeValue?: string
  ): Promise<object | null>;
  abstract update(attributeName: string, attributeValue: string, data: object): Promise<object>;
  abstract delete(
    attributeName: string,
    attributeValue: string,
    secondaryAttributeName?: string,
    secondaryAttributeValue?: string
  ): Promise<void>;
  abstract getMany(
    maxCount: number,
    firstItem?: object,
    attributeName?: string,
    attributeValue?: string,
    indexName?: string
  ): Promise<{ items: object[]; lastItemReturned: object | undefined }>;
  abstract getManySpecific(data: TableEntry[]): Promise<object[]>;
  abstract saveMany(data: SaveEntry[]): Promise<void>;
  abstract deleteMany(data: TableEntry[]): Promise<void>;
}
