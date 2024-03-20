import { AuthTokenDTO, StatusDTO } from "tweeter-shared";

export class StatusService {
  static async postStatus(
    authToken: AuthTokenDTO,
    status: StatusDTO
  ): Promise<void> {
    await new Promise((f) => setTimeout(f, 2000));
  }
}
