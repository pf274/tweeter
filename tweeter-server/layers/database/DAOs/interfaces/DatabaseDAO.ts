import { DAO } from "./DAO";

export interface DatabaseDAO extends DAO {
  save(attributeName: string, attributeValue: string, data: object): Promise<void>;
  get(attributeName: string, attributeValue: string): Promise<object>;
  update(attributeName: string, attributeValue: string, data: object): Promise<object>;
  delete(attributeName: string, attributeValue: string): Promise<void>;
  getMany(
    maxCount: number,
    firstItem?: string,
    attributeName?: string,
    attributeValue?: string
  ): Promise<{ items: object[]; lastItemReturned: string | undefined }>;
}
