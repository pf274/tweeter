import { AuthToken, Status } from "tweeter-shared";

export class StatusService {
  static async postStatus(
    authToken: AuthToken,
    status: Status
  ): Promise<{ successful: boolean }> {
    await new Promise((f) => setTimeout(f, 2000));
    return { successful: true };
  }
}
