import { APIGatewayProxyEvent } from "aws-lambda";
import { getRequestInfo } from "../utils/ApiHelpers";

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
    const response = await this._handler(requestInfo);
    if (typeof response === "string") {
      return response;
    } else {
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
