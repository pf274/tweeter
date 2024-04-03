import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { MessageView, Presenter } from "../generics/Presenter";

export interface UserInfoView extends MessageView {}

export class UserInfoPresenter extends Presenter {
  private _isFollower: boolean;
  protected service: UserService;
  private _followeesCount: number;
  private _followersCount: number;

  public constructor(view: UserInfoView) {
    super(view);
    this._isFollower = false;
    this.service = new UserService();
    this._followeesCount = -1;
    this._followersCount = -1;
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
    this.doFailureReportingOperation(async () => {
      if (currentUser === displayedUser) {
        this.isFollower = false;
      } else {
        this.isFollower = await this.service.getIsFollowerStatus(
          authToken,
          currentUser,
          displayedUser
        );
      }
    }, "determine follower status");
  }

  public async setNumbFollowees(authToken: AuthToken, displayedUser: User): Promise<void> {
    this.doFailureReportingOperation(async () => {
      this._followeesCount = await this.service.getFolloweesCount(authToken, displayedUser);
    }, "get followees count");
  }

  public async setNumbFollowers(authToken: AuthToken, displayedUser: User): Promise<void> {
    this.doFailureReportingOperation(async () => {
      this._followersCount = await this.service.getFollowersCount(authToken, displayedUser);
    }, "get followers count");
  }

  public async follow(authToken: AuthToken, currentUser: User, userToFollow: User): Promise<void> {
    this.doFailureReportingOperation(async () => {
      this.view.displayInfoMessage(`Adding ${userToFollow!.name} to followers...`, 0);

      let [newFollowersCount, newFolloweesCount] = await this.service.follow(
        authToken,
        currentUser,
        userToFollow
      );

      this.view.clearLastInfoMessage();
      this.isFollower = true;

      this._followersCount = newFollowersCount;
      this._followeesCount = newFolloweesCount;
    }, "follow user");
  }

  public async unfollow(
    authToken: AuthToken,
    currentUser: User,
    userToUnfollow: User
  ): Promise<void> {
    this.doFailureReportingOperation(async () => {
      this.view.displayInfoMessage(`Removing ${userToUnfollow.name} from followers...`, 0);

      const [newFollowersCount, newFolloweesCount] = await this.service.unfollow(
        authToken,
        currentUser,
        userToUnfollow
      );

      this.view.clearLastInfoMessage();

      this.isFollower = false;
      this._followersCount = newFollowersCount;
      this._followeesCount = newFolloweesCount;
    }, "unfollow user");
  }

  protected get view(): UserInfoView {
    return super.view as UserInfoView;
  }
}
