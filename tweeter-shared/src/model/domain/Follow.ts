import { User, UserDTO } from "./User";

export interface FollowDTO {
  follower: UserDTO;
  followee: UserDTO;
}

export class Follow {
  private _follower: User;
  private _followee: User;

  public constructor(follower: User, followee: User) {
    this._follower = follower;
    this._followee = followee;
  }

  public get follower(): User {
    return this._follower;
  }

  public set follower(value: User) {
    this._follower = value;
  }

  public get followee(): User {
    return this._followee;
  }

  public set followee(value: User) {
    this._followee = value;
  }

  public static fromDTO(dto: FollowDTO): Follow {
    return new Follow(User.fromDTO(dto.follower), User.fromDTO(dto.followee));
  }

  public get dto(): FollowDTO {
    return {
      follower: this._follower.dto,
      followee: this._followee.dto,
    };
  }
}
