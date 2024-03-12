export { Follow } from "./model/domain/Follow";
export { PostSegment, Type } from "./model/domain/PostSegment";
export { Status } from "./model/domain/Status";
export { User } from "./model/domain/User";
export { AuthToken } from "./model/domain/AuthToken";
export type { TweeterRequestBody } from "./model/requests/TweeterRequestBody";
export type { TweeterResponse } from "./model/responses/TweeterResponse";
export type { AuthenticateResponse } from "./model/responses/AuthenticateResponse";
export type { LoginRequestBody as LoginRequest } from "./model/requests/LoginRequest";

// All classes that should be avaialble to other modules need to exported here. export * does not work when
// uploading to lambda. Instead we have to list each export.
export { FakeData } from "./util/FakeData";
