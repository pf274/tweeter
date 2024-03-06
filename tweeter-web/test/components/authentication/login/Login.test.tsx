import React from "react";
import { MemoryRouter } from "react-router-dom";
import Login from "../../../../src/components/authentication/login/Login";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { LoginPresenter } from "../../../../src/presenter/authentication/LoginPresenter";
import { instance, mock, verify } from "ts-mockito";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fab);

describe("Login Component", () => {
  it("Renders with sign in button disabled", () => {
    const { signInButton } = renderLoginAndGetElements("/");
    expect(signInButton).toBeDisabled();
  });
  it("Sign in button is enabled when alias and password are entered", async () => {
    const { signInButton, aliasField, passwordField } =
      renderLoginAndGetElements("/");
    await userEvent.type(aliasField, "testAlias");
    await userEvent.type(passwordField, "testPassword");
    expect(signInButton).toBeEnabled();
  });
  it("Sign in button is disabled when either alias or password are empty", async () => {
    const { signInButton, aliasField, passwordField } =
      renderLoginAndGetElements("/");
    await userEvent.type(aliasField, "testAlias");
    expect(signInButton).toBeDisabled();
    await userEvent.clear(aliasField);
    await userEvent.type(passwordField, "testPassword");
    expect(signInButton).toBeDisabled();
  });
  it("Calls presenter doLogin when sign in button is clicked", async () => {
    const mockPresenter = mock<LoginPresenter>();
    const mockPresenterInstance = instance(mockPresenter);

    const originalUrl = "http://testurl.com";
    const alias = "testAlias";
    const password = "testPassword";
    const { signInButton, aliasField, passwordField } =
      renderLoginAndGetElements(originalUrl, mockPresenterInstance);
    await userEvent.type(aliasField, alias);
    await userEvent.type(passwordField, password);
    expect(signInButton).toBeEnabled();
    await userEvent.click(signInButton);
    verify(mockPresenter.doLogin(alias, password, originalUrl, false)).once();
  });
});

function renderLogin(originalUrl: string, presenter?: LoginPresenter) {
  return render(
    <MemoryRouter>
      <Login originalUrl={originalUrl} presenter={presenter} />
    </MemoryRouter>
  );
}

function renderLoginAndGetElements(
  originalUrl: string,
  presenter?: LoginPresenter
) {
  const user = userEvent.setup();
  renderLogin(originalUrl, presenter);
  const signInButton = screen.getByRole("button", { name: /sign in/i });
  const aliasField = screen.getByLabelText("aliasInput");
  const passwordField = screen.getByLabelText("passwordInput");

  return { user, signInButton, aliasField, passwordField };
}
