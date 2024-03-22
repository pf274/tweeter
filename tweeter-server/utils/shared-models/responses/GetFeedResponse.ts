import { StatusDTO } from "../domain/Status";
import { TweeterResponse } from "./TweeterResponse";

export interface GetFeedResponse extends TweeterResponse {
  readonly statusItems: StatusDTO[];
  readonly hasMore: boolean;
}
