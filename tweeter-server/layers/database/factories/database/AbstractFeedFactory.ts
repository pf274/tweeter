import { DatabaseDAO } from "../../DAOs/interfaces/DatabaseDAO";
import AbstractFactory from "../AbstractFactory";

export abstract class AbstractFeedFactory extends AbstractFactory<DatabaseDAO> {}
