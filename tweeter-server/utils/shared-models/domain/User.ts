export interface UserDTO {
  firstName: string;
  lastName: string;
  alias: string;
  imageURL: string;
  encryptedPassword: string;
}

export class User {
  private _firstName: string;
  private _lastName: string;
  private _alias: string;
  private _imageUrl: string;
  private _encryptedPassword: string;

  public constructor(
    firstName: string,
    lastName: string,
    alias: string,
    imageUrl: string,
    encryptedPassword: string
  ) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._alias = alias;
    this._imageUrl = imageUrl;
    this._encryptedPassword = encryptedPassword;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public set firstName(value: string) {
    this._firstName = value;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public set lastName(value: string) {
    this._lastName = value;
  }

  public get name() {
    return `${this.firstName} ${this.lastName}`;
  }

  public get alias(): string {
    return this._alias;
  }

  public set alias(value: string) {
    this._alias = value;
  }

  public get imageUrl(): string {
    return this._imageUrl;
  }

  public set imageUrl(value: string) {
    this._imageUrl = value;
  }

  public get encryptedPassword(): string {
    return this._encryptedPassword;
  }

  public equals(other: User): boolean {
    return this._alias === other._alias;
  }

  public static fromJson(json: string | null | undefined): User | null {
    if (!!json) {
      let jsonObject: {
        _firstName: string;
        _lastName: string;
        _alias: string;
        _imageUrl: string;
        _encryptedPassword: string;
      } = JSON.parse(json);
      return new User(
        jsonObject._firstName,
        jsonObject._lastName,
        jsonObject._alias,
        jsonObject._imageUrl,
        jsonObject._encryptedPassword
      );
    } else {
      return null;
    }
  }

  public toJson(): string {
    return JSON.stringify(this);
  }

  public static fromDTO(dto: UserDTO): User {
    return new User(dto.firstName, dto.lastName, dto.alias, dto.imageURL, dto.encryptedPassword);
  }

  public get dto(): UserDTO {
    return {
      firstName: this._firstName,
      lastName: this._lastName,
      alias: this._alias,
      imageURL: this._imageUrl,
      encryptedPassword: this._encryptedPassword,
    };
  }
}
