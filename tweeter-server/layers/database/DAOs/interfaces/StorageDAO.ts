import { DAO } from "./DAO";

export interface StorageDAO extends DAO {
  save(data: Buffer, contentType: string, fileName: string): Promise<string>;
}
