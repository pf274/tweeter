import { ErrorResponse, TweeterRequest, TweeterResponse } from "tweeter-shared";

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

  async doRequest<RequestType extends TweeterRequest, ResponseType extends TweeterResponse>(
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
    } else {
      Object.keys(request).forEach((key) => {
        let value = request[key as keyof TweeterRequest]; // Add index signature
        let stringValue: string = "";
        if (typeof value !== "string") {
          stringValue = JSON.stringify(value); // Type assertion to allow assigning string to never
        } else {
          stringValue = value;
        }
        if (stringValue !== "") {
          url.searchParams.append(key, stringValue);
        }
      });
    }
    try {
      const response: Response = await fetch(url.toString(), formattedRequest);
      if (response.ok) {
        const data: ResponseType = await response.json();
        return data;
      } else {
        const data = await response.json();
        const error: ErrorResponse = {
          statusCode: response.status,
          message: data.message || `Unknown error: ${JSON.stringify(response)}`,
        };
        throw new Error(JSON.stringify(error));
      }
    } catch (err) {
      throw new Error(`Client communicator doRequest failed:\n${(err as Error).message}`);
    }
  }
}
