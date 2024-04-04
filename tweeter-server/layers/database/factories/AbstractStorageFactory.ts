import { StorageImageDAO } from "../DAOs/templates/storage/StorageImageDAO";
import { Factory } from "./Factory";

export abstract class AbstractStorageFactory extends Factory {
  protected _imageDAO: StorageImageDAO | null = null;

  abstract get imageDAO(): StorageImageDAO;
}
