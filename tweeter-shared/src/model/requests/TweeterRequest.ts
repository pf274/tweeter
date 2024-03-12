interface TweeterRequestParams {
  queryParameters: { [key: string]: string } | null;
  pathParameters: { [key: string]: string } | null;
  body: any | null;
  method: string;
  endpoint: string;
}

export abstract class TweeterRequest {
  private _queryParameters: { [key: string]: string };
  private _pathParameters: { [key: string]: string };
  private _body: any;
  private _method: string;
  private _endpoint: string;

  constructor(params: TweeterRequestParams) {
    this._queryParameters = params.queryParameters || {};
    this._pathParameters = params.pathParameters || {};
    this._body = params.body;
    this._method = params.method;
    this._endpoint = params.endpoint;
  }

  get queryParameters(): { [key: string]: string } {
    return this._queryParameters;
  }

  get pathParameters(): { [key: string]: string } {
    return this._pathParameters;
  }

  get body(): any {
    return this._body;
  }

  get method(): string {
    return this._method;
  }

  get endpoint(): string {
    return this._endpoint;
  }

  /**
   * Should be implemented by each request to validate the request.
   */
  abstract isValid(): boolean;

  abstract responseClassName(): string;
}
