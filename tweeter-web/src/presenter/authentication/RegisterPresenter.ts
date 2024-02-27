import { AuthToken, User } from "tweeter-shared";
import { AuthenticationService } from "../../model/service/AuthenticationService";
import { Buffer } from "buffer";
import { Presenter, View } from "../generics/Presenter";

export interface RegisterView extends View {
  updateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ) => void;
  navigate: (path: string) => void;
}

export class RegisterPresenter extends Presenter {
  private service: AuthenticationService;

  public constructor(view: RegisterView) {
    super(view);
    this.service = new AuthenticationService();
  }

  public async doRegister(
    alias: string,
    firstName: string,
    lastName: string,
    password: string,
    imageBytes: Uint8Array,
    rememberMe: boolean
  ): Promise<void> {
    this.doFailureReportingOperation(async () => {
      let [user, authToken] = await this.service.register(
        alias,
        password,
        firstName,
        lastName,
        imageBytes
      );
      this.view.updateUserInfo(user, user, authToken, rememberMe);
      this.view.navigate("/");
    }, "register user");
  }

  protected get view(): RegisterView {
    return super.view as RegisterView;
  }

  public checkStatus(
    alias: string,
    firstName: string,
    lastName: string,
    password: string,
    imageUrl: string
  ): boolean {
    return !firstName || !lastName || !alias || !password || !imageUrl;
  }

  public handleImageFile(
    file: File | undefined
  ): [newImageBytes: Uint8Array, newImageUrl: string] {
    let newImageBytes: Uint8Array = new Uint8Array();
    let newImageUrl: string = "";
    if (file) {
      newImageUrl = URL.createObjectURL(file);

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageStringBase64 = event.target?.result as string;

        // Remove unnecessary file metadata from the start of the string.
        const imageStringBase64BufferContents =
          imageStringBase64.split("base64,")[1];

        const bytes: Uint8Array = Buffer.from(
          imageStringBase64BufferContents,
          "base64"
        );

        newImageBytes = bytes;
      };
      reader.readAsDataURL(file);
    }
    return [newImageBytes, newImageUrl];
  }
}
