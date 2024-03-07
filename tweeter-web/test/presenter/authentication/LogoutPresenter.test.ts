import { AuthToken } from "tweeter-shared";
import {
  LogoutPresenter,
  LogoutView,
} from "../../../src/presenter/authentication/LogoutPresenter";
import { anything, instance, mock, spy, verify, when } from "ts-mockito";
import { AuthenticationService } from "../../../src/model/service/AuthenticationService";

describe("LogoutPresenter (AppNavbarPresenter)", () => {
  let mockLogoutView: LogoutView;
  let mockLogoutPresenter: LogoutPresenter;
  let mockAuthenticationService: AuthenticationService;

  const authToken = new AuthToken("token", Date.now());

  beforeEach(() => {
    mockLogoutView = mock<LogoutView>();
    const mockLogoutViewInstance = instance(mockLogoutView);
    const mockLogoutPresenterSpy = spy(
      new LogoutPresenter(mockLogoutViewInstance)
    );
    mockLogoutPresenter = instance(mockLogoutPresenterSpy);

    mockAuthenticationService = mock<AuthenticationService>();
    const mockAuthenticationServiceInstance = instance(
      mockAuthenticationService
    );
    when(mockLogoutPresenterSpy.service).thenReturn(
      mockAuthenticationServiceInstance
    );
  });

  it("Logout message", async () => {
    await mockLogoutPresenter.doLogout(authToken);
    verify(mockLogoutView.displayInfoMessage("Logging Out...", 0)).once();
    verify(mockLogoutView.displayErrorMessage(anything())).never();
  });

  it("User Service Logout with correct auth token", async () => {
    await mockLogoutPresenter.doLogout(authToken);
    verify(mockAuthenticationService.logout(authToken)).once();
    verify(mockLogoutView.displayErrorMessage(anything())).never();
  });
  it("Clear user info and navigate away", async () => {
    await mockLogoutPresenter.doLogout(authToken);
    verify(mockLogoutView.clearUserInfo()).once();
    verify(mockLogoutView.clearLastInfoMessage()).once();
    verify(mockLogoutView.navigate("/")).once();
    verify(mockLogoutView.displayErrorMessage(anything())).never();
  });
  it("Correct error handling for logout", async () => {
    const error = new Error("Test");
    when(mockAuthenticationService.logout(authToken)).thenThrow(error);
    await mockLogoutPresenter.doLogout(authToken);
    verify(
      mockLogoutView.displayErrorMessage(
        "Failed to log user out because of exception: Test"
      )
    ).once();
    verify(mockLogoutView.clearLastInfoMessage()).never();
    verify(mockLogoutView.clearUserInfo()).never();
    verify(mockLogoutView.navigate("/")).never();
  });
});
