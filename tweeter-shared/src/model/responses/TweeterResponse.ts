interface TweeterResponseParams {
  statusCode: number;
  body: any;
}

export abstract class TweeterResponse {
  private _statusCode: number;
  private _body: any;

  constructor(params: TweeterResponseParams) {
    this._statusCode = params.statusCode;
    this._body = params.body;
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get body(): any {
    return this._body;
  }

  /**
   * Should be implemented by each response to validate the response.
   */
  abstract isValid(): boolean;
}
