import {
  AuthToken,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {
  private SERVER_URL = "TODO: REPLACE WITH SERVER URL";
  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);
  async login(request: LoginRequest): Promise<LoginResponse> {
    return this.clientCommunicator.doRequest(request, "/auth/login", "POST");
  }
  async register(request: RegisterRequest): Promise<RegisterResponse> {
    return this.clientCommunicator.doRequest(request, "/auth/register", "POST");
  }
}
