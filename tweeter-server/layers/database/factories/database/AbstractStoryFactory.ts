import { Status } from "../../../../utils/shared-models/domain/Status";
import { DatabaseDAO } from "../../DAOs/interfaces/DatabaseDAO";
import AbstractFactory from "../AbstractFactory";

export abstract class AbstractStoryFactory extends AbstractFactory<DatabaseDAO> {}
