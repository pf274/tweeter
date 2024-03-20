import { AuthTokenDTO, StatusDTO } from "tweeter-shared";

export class StatusService {
  static async postStatus(
    authToken: AuthTokenDTO,
    status: StatusDTO
  ): Promise<{ successful: boolean }> {
    await new Promise((f) => setTimeout(f, 2000));
    return { successful: true };
  }
}
