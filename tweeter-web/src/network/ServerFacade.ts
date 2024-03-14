import { AuthToken, LoginRequest, LoginResponse, User } from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {
  private SERVER_URL = "TODO: REPLACE WITH SERVER URL";
  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);
  async login(request: LoginRequest): Promise<LoginResponse> {
    return this.clientCommunicator.doRequest(request);
  }
}
