import { anything, instance, mock, spy, verify, when } from "ts-mockito";
import {
  PostStatusPresenter,
  PostStatusView,
} from "../../../src/presenter/status/PostStatusPresenter";
import { StatusService } from "../../../src/model/service/StatusService";
import { AuthToken, Status, User } from "tweeter-shared";

describe("PostStatusPresenter", () => {
  let mockPostStatusView: PostStatusView;
  let mockPostStatusPresenter: PostStatusPresenter;
  let mockStatusService: StatusService;

  const authToken = new AuthToken("token", Date.now());
  const user = new User("firstName", "lastName", "username", "url");
  const status = new Status("Hello there", user, Date.now());

  beforeEach(() => {
    mockPostStatusView = mock<PostStatusView>();
    const mockPostStatusViewInstance = instance(mockPostStatusView);
    const mockPostStatusPresenterSpy = spy(
      new PostStatusPresenter(mockPostStatusViewInstance)
    );
    mockPostStatusPresenter = instance(mockPostStatusPresenterSpy);

    mockStatusService = mock<StatusService>();
    const mockStatusServiceInstance = instance(mockStatusService);
    when(mockPostStatusPresenterSpy.service).thenReturn(
      mockStatusServiceInstance
    );
  });
  it("Display post status message", async () => {
    await mockPostStatusPresenter.postStatus(authToken, status);
    verify(
      mockPostStatusView.displayInfoMessage("Posting status...", 0)
    ).once();
    verify(mockPostStatusView.displayErrorMessage(anything())).never();
  });
  it("Post status with correct status string and auth token", async () => {
    await mockPostStatusPresenter.postStatus(authToken, status);
    verify(mockStatusService.postStatus(authToken, status)).once();
    verify(mockPostStatusView.displayErrorMessage(anything())).never();
  });
  it("Clear post status, clear last info message and display status posted message", async () => {
    await mockPostStatusPresenter.postStatus(authToken, status);
    verify(mockPostStatusView.setPost("")).once();
    verify(mockPostStatusView.clearLastInfoMessage()).once();
    verify(
      mockPostStatusView.displayInfoMessage("Status posted!", 2000)
    ).once();
    verify(mockPostStatusView.displayErrorMessage(anything())).never();
  });
  it("Correct error handling for post status", async () => {
    const error = new Error("Test");
    when(mockStatusService.postStatus(authToken, status)).thenThrow(error);
    await mockPostStatusPresenter.postStatus(authToken, status);
    verify(
      mockPostStatusView.displayErrorMessage(
        "Failed to post the status because of exception: Test"
      )
    ).once();
    verify(mockPostStatusView.setPost(anything())).never();
    verify(mockPostStatusView.clearLastInfoMessage()).never();
    verify(
      mockPostStatusView.displayInfoMessage("Posting status...", anything())
    ).once();
    verify(
      mockPostStatusView.displayInfoMessage("Status posted!", anything())
    ).never();
  });
});
