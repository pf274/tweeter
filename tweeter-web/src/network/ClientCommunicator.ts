import { TweeterRequest, TweeterResponse } from "tweeter-shared";

export class ClientCommunicator {
  private SERVER_URL: string;
  constructor(serverUrl: string) {
    this.SERVER_URL = serverUrl;
  }

  async doRequest(request: TweeterRequest): Promise<TweeterResponse> {
    const url = new URL(this.SERVER_URL + request.endpoint);
    // add query parameters
    for (const [key, value] of Object.entries(request.queryParameters)) {
      url.searchParams.append(key, value);
    }
    // add path parameters
    for (const [key, value] of Object.entries(request.pathParameters)) {
      url.pathname = url.pathname.replace(`{${key}}`, value);
    }
    const formattedRequest = {
      method: request.method,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(request.body),
    };
    try {
      const response: Response = await fetch(url.toString(), formattedRequest);
      if (response.ok) {
        const data: JSON = await response.json();
        return {
          statusCode: response.status,
          body: data,
        };
      }
      const error = await response.json();
      throw new Error(error.message);
    } catch (err) {
      throw new Error(`Client communicator doRequest failed:\n${(err as Error).message}`);
    }
  }
}
