import { TweeterRequestBody } from "tweeter-shared";

export class ClientCommunicator {
  private SERVER_URL: string;
  constructor(serverUrl: string) {
    this.SERVER_URL = serverUrl;
  }

  async doPost<RequestBodyType extends TweeterRequestBody>(
    body: RequestBodyType,
    endpoint: string
  ): Promise<JSON> {
    const url = this.SERVER_URL + endpoint;
    const request = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
    };
    try {
      const response: Response = await fetch(url, request);
      if (response.ok) {
        const data: JSON = await response.json();
        return data;
      }
      const error = await response.json();
      throw new Error(error.message);
    } catch (err) {
      throw new Error(`Client communicator doPost failed:\n${(err as Error).message}`);
    }
  }
}
