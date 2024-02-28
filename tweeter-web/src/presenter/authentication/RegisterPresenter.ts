import { Buffer } from "buffer";
import { AuthPresenter, AuthView } from "../generics/AuthPresenter";

export class RegisterPresenter extends AuthPresenter {
  public constructor(view: AuthView) {
    super(view);
  }

  public async doRegister(
    alias: string,
    firstName: string,
    lastName: string,
    password: string,
    imageBytes: Uint8Array,
    rememberMe: boolean
  ): Promise<void> {
    this.handleUserAuthentication(
      () => this.service.register(alias, password, firstName, lastName, imageBytes),
      rememberMe,
      "register user"
    );
  }

  protected get view(): AuthView {
    return super.view as AuthView;
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

  public handleImageFile(file: File | undefined): [newImageBytes: Uint8Array, newImageUrl: string] {
    let newImageBytes: Uint8Array = new Uint8Array();
    let newImageUrl: string = "";
    if (file) {
      newImageUrl = URL.createObjectURL(file);

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageStringBase64 = event.target?.result as string;

        // Remove unnecessary file metadata from the start of the string.
        const imageStringBase64BufferContents = imageStringBase64.split("base64,")[1];

        const bytes: Uint8Array = Buffer.from(imageStringBase64BufferContents, "base64");

        newImageBytes = bytes;
      };
      reader.readAsDataURL(file);
    }
    return [newImageBytes, newImageUrl];
  }
}
