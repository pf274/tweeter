import React from "react";
import { MemoryRouter } from "react-router-dom";
import PostStatus from "../../../src/components/postStatus/PostStatus";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import {
  PostStatusPresenter,
  PostStatusView,
} from "../../../src/presenter/status/PostStatusPresenter";
import {
  anything,
  capture,
  instance,
  mock,
  spy,
  verify,
  when,
} from "ts-mockito";
import useUserInfoHook from "../../../src/components/userInfo/UserInfoHook";
import { AuthToken, User } from "tweeter-shared";
import { StatusService } from "../../../src/model/service/StatusService";

jest.mock("../../../src/components/userInfo/UserInfoHook", () => ({
  ...jest.requireActual("../../../src/components/userInfo/UserInfoHook"),
  __esModule: true,
  default: jest.fn(),
}));

describe("PostStatus Component", () => {
  let mockPresenter: PostStatusPresenter;
  let mockService: StatusService;
  const mockUserInstance = new User("firstName", "lastName", "alias", "url");
  const mockAuthTokenInstance = new AuthToken("token", Date.now());
  beforeAll(() => {
    (useUserInfoHook as jest.Mock).mockReturnValue({
      currentUser: mockUserInstance,
      authToken: mockAuthTokenInstance,
    });
    const mockPresenterView = mock<PostStatusView>();
    const mockPresenterViewInstance = instance(mockPresenterView);
    const mockPresenterSpy = spy(
      new PostStatusPresenter(mockPresenterViewInstance)
    );
    mockService = mock<StatusService>();
    when(mockService.postStatus(anything(), anything())).thenResolve();
    const mockServiceInstance = instance(mockService);
    when(mockPresenterSpy.service).thenReturn(mockServiceInstance);
    mockPresenter = instance(mockPresenterSpy);
  });
  it("Renders with post button and clear button disabled", () => {
    const { postButton, clearButton } = renderPostStatusAndGetElements();
    expect(postButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
  });
  it("Post button and clear button are enabled when post is entered", async () => {
    const { postButton, clearButton, postTextArea } =
      renderPostStatusAndGetElements();
    await userEvent.type(postTextArea, "testPost");
    expect(clearButton).toBeEnabled();
    expect(postButton).toBeEnabled();
  });
  it("Post button and clear button are disabled when post is cleared", async () => {
    const { postButton, clearButton, postTextArea } =
      renderPostStatusAndGetElements();
    await userEvent.type(postTextArea, "testPost");
    expect(postButton).toBeEnabled();
    expect(clearButton).toBeEnabled();
    await userEvent.clear(postTextArea);
    expect(postButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
  });
  it("Calls presenter postStatus with correct parameters when post button is clicked", async () => {
    const { postButton, postTextArea } =
      renderPostStatusAndGetElements(mockPresenter);
    const postText = "hello there";
    await userEvent.type(postTextArea, postText);
    expect(postButton).toBeEnabled();
    await userEvent.click(postButton);
    const [authToken, status] = capture(mockService.postStatus).last();
    expect(authToken).toBe(mockAuthTokenInstance);
    expect(status.post).toBe(postText);
  });
});

function renderPostStatus(presenter?: PostStatusPresenter) {
  return render(
    // <MemoryRouter>
    <PostStatus presenter={presenter} />
    // </MemoryRouter>
  );
}

function renderPostStatusAndGetElements(presenter?: PostStatusPresenter) {
  const user = userEvent.setup();
  renderPostStatus(presenter);
  const postButton = screen.getByLabelText("postStatusButton");
  const clearButton = screen.getByLabelText("clearStatusButton");
  const postTextArea = screen.getByLabelText("postStatusTextArea");
  return { postButton, clearButton, postTextArea, user };
}
