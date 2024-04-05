import "./UserInfo.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfoHook from "./UserInfoHook";
import { UserInfoPresenter, UserInfoView } from "../../presenter/user/UserInfoPresenter";

interface UserInfoProps {}

const UserInfo = (props: UserInfoProps) => {
  const { displayErrorMessage, displayInfoMessage, clearLastInfoMessage } = useToastListener();
  const [isFollower, setIsFollower] = useState<boolean>(false);
  const [followeesCount, setFolloweesCount] = useState<number>(0);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const listener: UserInfoView = {
    displayErrorMessage,
    displayInfoMessage,
    clearLastInfoMessage,
    setIsFollowing: (isFollower: boolean) => setIsFollower(isFollower),
    setFolloweesCount: (count: number) => setFolloweesCount(count),
    setFollowersCount: (count: number) => setFollowersCount(count),
  };
  const [presenter] = useState<UserInfoPresenter>(new UserInfoPresenter(listener));

  const { currentUser, authToken, displayedUser, setDisplayedUser } = useUserInfoHook();

  if (!displayedUser) {
    setDisplayedUser(currentUser!);
  }

  useEffect(() => {
    presenter.setIsFollowerStatus(authToken!, currentUser!, displayedUser!);
    presenter.setNumbFollowees(authToken!, displayedUser!);
    presenter.setNumbFollowers(authToken!, displayedUser!);
  }, [displayedUser, currentUser]);

  const switchToLoggedInUser = (event: React.MouseEvent): void => {
    event.preventDefault();
    setDisplayedUser(currentUser!);
  };

  const followDisplayedUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();
    presenter.follow(authToken!, currentUser!, displayedUser!);
  };

  const unfollowDisplayedUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();
    presenter.unfollow(authToken!, currentUser!, displayedUser!);
  };

  return (
    <>
      {currentUser === null || displayedUser === null || authToken === null ? (
        <></>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-auto p-3">
              <img
                src={displayedUser.imageUrl}
                className="img-fluid"
                width="100"
                alt="Posting user"
              />
            </div>
            <div className="col p-3">
              {displayedUser !== currentUser && (
                <p id="returnToLoggedInUser">
                  Return to{" "}
                  <Link to={""} onClick={(event) => switchToLoggedInUser(event)}>
                    logged in user
                  </Link>
                </p>
              )}
              <h2>
                <b>{displayedUser.name}</b>
              </h2>
              <h3>{displayedUser.alias}</h3>
              <br />
              {followeesCount > -1 && followersCount > -1 && (
                <div>
                  Following: {followeesCount} Followers: {followersCount}
                </div>
              )}
            </div>
            <form>
              {displayedUser !== currentUser && (
                <div className="form-group">
                  {isFollower ? (
                    <button
                      id="unFollowButton"
                      className="btn btn-md btn-secondary me-1"
                      type="submit"
                      onClick={(event) => unfollowDisplayedUser(event)}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      id="followButton"
                      className="btn btn-md btn-primary me-1"
                      type="submit"
                      onClick={(event) => followDisplayedUser(event)}
                    >
                      Follow
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfo;
