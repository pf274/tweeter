import { AuthToken } from "../../utils/shared-models/domain/AuthToken";
import { Status } from "../../utils/shared-models/domain/Status";
import { Service } from "./Service";

export class StatusService extends Service {
  static async postStatus(authToken: AuthToken, status: Status): Promise<{ successful: boolean }> {
    await new Promise((f) => setTimeout(f, 2000));
    return { successful: true };
  }
}
