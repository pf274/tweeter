import { StorageDAO } from "../../DAOs/interfaces/StorageDAO";
import AbstractFactory from "../AbstractFactory";

export abstract class AbstractImageFactory extends AbstractFactory<StorageDAO> {
  abstract uploadImage(imageData: Buffer, imageName: string): Promise<string>;
}
