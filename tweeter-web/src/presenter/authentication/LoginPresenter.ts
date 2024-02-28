import { AuthPresenter, AuthView } from "../generics/AuthPresenter";

export class LoginPresenter extends AuthPresenter {
  public constructor(view: AuthView) {
    super(view);
  }

  public async doLogin(
    alias: string,
    password: string,
    originalUrl: string | undefined,
    rememberMe: boolean
  ): Promise<void> {
    this.handleUserAuthentication(
      () => this.service.login(alias, password),
      rememberMe,
      "log user in",
      originalUrl
    );
  }

  protected get view(): AuthView {
    return super.view as AuthView;
  }

  public checkStatus(alias: string, password: string): boolean {
    return !alias || !password;
  }
}
