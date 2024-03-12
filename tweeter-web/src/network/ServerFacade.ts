import { LoginRequest, AuthenticateResponse } from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {
  private SERVER_URL = "TODO: REPLACE WITH SERVER URL";
  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);
  async login(request: LoginRequest): Promise<AuthenticateResponse> {
    const endpoint = "/service/login";
    const response: JSON = await this.clientCommunicator.doPost(request, endpoint);
    return response as AuthenticateResponse;
  }
}
