import { AuthToken } from "../../utils/shared-models/domain/AuthToken";
import { Status } from "../../utils/shared-models/domain/Status";

export class StatusService {
  static async postStatus(
    authToken: AuthToken,
    status: Status
  ): Promise<{ successful: boolean }> {
    await new Promise((f) => setTimeout(f, 2000));
    return { successful: true };
  }
}
