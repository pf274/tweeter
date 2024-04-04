import { APIGatewayProxyEvent } from "aws-lambda";
import { getRequestInfo } from "../utils/ApiHelpers";
import chalk from "chalk";

export enum methodType {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete",
  patch = "patch",
  options = "options",
  head = "head",
  connect = "connect",
  trace = "trace",
}

export type ApiRequestInfo = {
  queryParameters: { [key: string]: any };
  pathParameters: { [key: string]: any };
  body: string;
};

export type HandlerType = (requestInfo: ApiRequestInfo) => Promise<any>;

export class ApiRoute {
  private _path: string;
  private _method: methodType;
  private _handler: HandlerType;

  constructor(path: string, method: methodType, handler: HandlerType) {
    this._path = path;
    this._method = method;
    this._handler = handler;
  }

  async handle(event: APIGatewayProxyEvent): Promise<string> {
    const requestInfo = getRequestInfo(event);
    console.log(`\x1b[32m${event.path}\x1b[37m Request:\x1b[0m`, requestInfo);
    const response = await this._handler(requestInfo);
    if (typeof response === "string") {
      console.log(`\x1b[36m${event.path}\x1b[37m Response:\x1b[0m"${response}"`);
      return response;
    } else {
      console.log(`\x1b[36m${event.path}\x1b[37m Response:\x1b[0m`, response);
      return JSON.stringify(response);
    }
  }

  matches(path: string, method: methodType) {
    return this._path === path && this._method === method;
  }

  static get(path: string, handler: HandlerType) {
    return new ApiRoute(path, methodType.get, handler);
  }

  static post(path: string, handler: HandlerType) {
    return new ApiRoute(path, methodType.post, handler);
  }

  static put(path: string, handler: HandlerType) {
    return new ApiRoute(path, methodType.put, handler);
  }

  static delete(path: string, handler: HandlerType) {
    return new ApiRoute(path, methodType.delete, handler);
  }
}
