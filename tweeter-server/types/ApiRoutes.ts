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
  body: JSON;
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

  handle(event: APIGatewayProxyEvent): Promise<any> {
    const requestInfo = getRequestInfo(event);
    return this._handler(requestInfo);
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
