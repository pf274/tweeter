import { TweeterRequest, TweeterResponse } from "tweeter-shared";

type ApiRequest = {
  method: string;
  headers: Headers;
  body?: string;
};

export class ClientCommunicator {
  private SERVER_URL: string;
  constructor(serverUrl: string) {
    this.SERVER_URL = serverUrl;
  }

  async doRequest<
    RequestType extends TweeterRequest,
    ResponseType extends TweeterResponse
  >(
    request: RequestType,
    endpoint: string,
    method: "GET" | "POST" | "DELETE"
  ): Promise<ResponseType> {
    const url = new URL(this.SERVER_URL + endpoint);
    const formattedRequest: ApiRequest = {
      method,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };
    if (method != "GET") {
      formattedRequest.body = JSON.stringify(request);
    }
    try {
      const response: Response = await fetch(url.toString(), formattedRequest);
      if (response.ok) {
        const data: ResponseType = await response.json();
        return data;
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (err) {
      throw new Error(
        `Client communicator doRequest failed:\n${(err as Error).message}`
      );
    }
  }
}
