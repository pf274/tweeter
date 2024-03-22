import { AuthTokenDTO } from "../domain/AuthToken";
import { StatusDTO } from "../domain/Status";
import { UserDTO } from "../domain/User";
import { TweeterRequest } from "./TweeterRequest";

export interface GetStoriesRequest extends TweeterRequest {
  readonly authToken: AuthTokenDTO;
  readonly user: UserDTO;
  readonly pageSize: number;
  readonly lastItem: StatusDTO | null;
}
