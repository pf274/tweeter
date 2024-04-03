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

  public async handleImageFile(
    file: File | undefined
  ): Promise<[newImageBytes: Uint8Array, newImageUrl: string]> {
    let newImageBytes: Uint8Array = new Uint8Array();
    let newImageUrl: string = "";
    if (file) {
      newImageUrl = URL.createObjectURL(file);

      const reader = new FileReader();
      const promise = new Promise<[newImageBytes: Uint8Array, newImageUrl: string]>(
        (resolve, reject) => {
          reader.onload = (event: ProgressEvent<FileReader>) => {
            const imageStringBase64 = event.target?.result as string;
            const imageStringBase64BufferContents = imageStringBase64.split("base64,")[1];
            newImageBytes = new Uint8Array(Buffer.from(imageStringBase64BufferContents, "base64"));
            resolve([newImageBytes, newImageUrl]);
          };
          reader.onerror = (error) => reject(error);
        }
      );
      reader.readAsDataURL(file);
      return await promise;
    }
    return [newImageBytes, newImageUrl];
  }
}
