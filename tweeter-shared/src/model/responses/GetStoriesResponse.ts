import { StatusDTO } from "../domain/Status";
import { TweeterResponse } from "./TweeterResponse";

export interface GetStoriesResponse extends TweeterResponse {
  readonly statusItems: StatusDTO[];
  readonly hasMore: boolean;
}
