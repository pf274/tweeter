import { AuthToken, Status } from "tweeter-shared";

export class StatusService {
  static async postStatus(authToken: AuthToken, status: Status): Promise<void> {
    await new Promise((f) => setTimeout(f, 2000));
  }
}
