function uuid() {
  const randomString = Array(32)
    .fill(0)
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
  return `${randomString.slice(0, 8)}-${randomString.slice(8, 12)}-${randomString.slice(
    12,
    16
  )}-${randomString.slice(16, 20)}-${randomString.slice(20, 32)}`;
}

export interface AuthTokenDTO {
  token: string;
  timestamp: number;
}

export class AuthToken {
  private _token: string;
  private _timestamp: number;

  public static Generate(): AuthToken {
    const token: string = AuthToken.generateToken();
    const timestamp: number = Date.now();
    return new AuthToken(token, timestamp);
  }

  private static generateToken(): string {
    try {
      return uuid();
    } catch (error) {
      // UUID not available. Generating a random string. Making it 64 characters to reduce the liklihood of a duplicate
      let result = "";
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$^*()-+";
      const charactersLength = characters.length;
      for (let i = 0; i < 64; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return result;
    }
  }

  public constructor(token: string, timestamp: number) {
    this._token = token;
    this._timestamp = timestamp;
  }

  public get token(): string {
    return this._token;
  }

  public set token(value: string) {
    this._token = value;
  }

  public get timestamp(): number {
    return this._timestamp;
  }

  public set timestamp(value: number) {
    this._timestamp = value;
  }

  public static fromJson(json: string | null | undefined): AuthToken | null {
    if (!!json) {
      let jsonObject: { _token: string; _timestamp: number } = JSON.parse(json);
      return new AuthToken(jsonObject._token, jsonObject._timestamp);
    } else {
      return null;
    }
  }

  public toJson(): string {
    return JSON.stringify(this);
  }

  public static fromDTO(dto: AuthTokenDTO): AuthToken {
    return new AuthToken(dto.token, dto.timestamp);
  }

  public get dto(): AuthTokenDTO {
    return {
      token: this._token,
      timestamp: this._timestamp,
    };
  }
}
