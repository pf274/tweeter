import { DAO } from "./DAO";

export interface DatabaseDAO extends DAO {
  save(attributeName: string, attributeValue: string, data: object): Promise<void>;
  get(
    attributeName: string,
    attributeValue: string,
    secondaryAttributeName?: string,
    secondaryAttributeValue?: string
  ): Promise<object | null>;
  update(attributeName: string, attributeValue: string, data: object): Promise<object>;
  delete(
    attributeName: string,
    attributeValue: string,
    secondaryAttributeName?: string,
    secondaryAttributeValue?: string
  ): Promise<void>;
  getMany(
    maxCount: number,
    firstItem?: string,
    attributeName?: string,
    attributeValue?: string,
    indexName?: string
  ): Promise<{ items: object[]; lastItemReturned: string | undefined }>;
}
