import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";

export interface UserInfoView {
  displayErrorMessage: (message: string) => void;
  displayInfoMessage: (message: string, timeout: number) => void;
  clearLastInfoMessage: () => void;
}

export class UserInfoPresenter {
  private _view: UserInfoView;
  private _isFollower: boolean;
  protected service: UserService;
  private _followeesCount: number;
  private _followersCount: number;

  public constructor(view: UserInfoView) {
    this._view = view;
    this._isFollower = false;
    this.service = new UserService();
    this._followeesCount = -1;
    this._followersCount = -1;
  }

  protected get view(): UserInfoView {
    return this._view;
  }

  protected set isFollower(value: boolean) {
    this._isFollower = value;
  }

  public get isFollower(): boolean {
    return this._isFollower;
  }

  public get followeesCount(): number {
    return this._followeesCount;
  }

  public get followersCount(): number {
    return this._followersCount;
  }

  public async setIsFollowerStatus(
    authToken: AuthToken,
    currentUser: User,
    displayedUser: User
  ): Promise<void> {
    try {
      if (currentUser === displayedUser) {
        this.isFollower = false;
      } else {
        this.isFollower = await this.service.getIsFollowerStatus(
          authToken,
          currentUser,
          displayedUser
        );
      }
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to determine follower status because of exception: ${error}`
      );
    }
  }

  public async setNumbFollowees(
    authToken: AuthToken,
    displayedUser: User
  ): Promise<void> {
    try {
      this._followeesCount = await this.service.getFolloweesCount(
        authToken,
        displayedUser
      );
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to get followees count because of exception: ${error}`
      );
    }
  }

  public async setNumbFollowers(
    authToken: AuthToken,
    displayedUser: User
  ): Promise<void> {
    try {
      this._followersCount = await this.service.getFollowersCount(
        authToken,
        displayedUser
      );
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to get followers count because of exception: ${error}`
      );
    }
  }

  public async follow(authToken: AuthToken, userToFollow: User): Promise<void> {
    try {
      this.view.displayInfoMessage(
        `Adding ${userToFollow!.name} to followers...`,
        0
      );

      let [newFollowersCount, newFolloweesCount] = await this.service.follow(
        authToken,
        userToFollow
      );

      this.view.clearLastInfoMessage();
      this.isFollower = true;

      this._followersCount = newFollowersCount;
      this._followeesCount = newFolloweesCount;
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to follow user because of exception: ${error}`
      );
    }
  }

  public async unfollow(
    authToken: AuthToken,
    userToUnfollow: User
  ): Promise<void> {
    try {
      this.view.displayInfoMessage(
        `Removing ${userToUnfollow.name} from followers...`,
        0
      );

      const [newFollowersCount, newFolloweesCount] =
        await this.service.unfollow(authToken, userToUnfollow);

      this.view.clearLastInfoMessage();

      this.isFollower = false;
      this._followersCount = newFollowersCount;
      this._followeesCount = newFolloweesCount;
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to unfollow user because of exception: ${error}`
      );
    }
  }
}
