import "./PostStatus.css";
import { useState } from "react";
import { AuthToken, Status, User } from "tweeter-shared";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfoHook from "../userInfo/UserInfoHook";
import {
  PostStatusPresenter,
  PostStatusView,
} from "../../presenter/status/PostStatusPresenter";

interface Props {
  presenter?: PostStatusPresenter;
}
const PostStatus = (props: Props) => {
  const { displayErrorMessage, displayInfoMessage, clearLastInfoMessage } =
    useToastListener();

  const { currentUser, authToken } = useUserInfoHook();

  const [post, setPost] = useState("");
  const listener: PostStatusView = {
    displayErrorMessage: displayErrorMessage,
    displayInfoMessage: displayInfoMessage,
    clearLastInfoMessage: clearLastInfoMessage,
    setPost: setPost,
  };
  const [presenter] = useState(
    props.presenter || new PostStatusPresenter(listener)
  );

  const submitPost = async (event: React.MouseEvent) => {
    event.preventDefault();
    presenter.postStatus(
      authToken!,
      new Status(post, currentUser!, Date.now())
    );
  };

  const clearPost = (event: React.MouseEvent) => {
    event.preventDefault();
    setPost("");
  };

  const checkButtonStatus: () => boolean = () => {
    return !post.trim() || !authToken || !currentUser;
  };

  return (
    <form>
      <div className="form-group mb-3">
        <textarea
          className="form-control"
          id="postStatusTextArea"
          aria-label="postStatusTextArea"
          rows={10}
          placeholder="What's on your mind?"
          value={post}
          onChange={(event) => {
            setPost(event.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <button
          id="postStatusButton"
          aria-label="postStatusButton"
          className="btn btn-md btn-primary me-1"
          type="button"
          disabled={checkButtonStatus()}
          onClick={(event) => submitPost(event)}
        >
          Post Status
        </button>
        <button
          id="clearStatusButton"
          aria-label="clearStatusButton"
          className="btn btn-md btn-secondary"
          type="button"
          disabled={checkButtonStatus()}
          onClick={(event) => clearPost(event)}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default PostStatus;
