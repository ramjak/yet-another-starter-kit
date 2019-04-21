import IAuthService from './IAuthService';
import IPersistentStorage from './IPersistentStorage';

export default class AuthService implements IAuthService {
  public static readonly AUTH_KEY = '_app_';
  public static readonly DAY_AFTER_EXPIRED = 7;

  private storage: IPersistentStorage;

  constructor(storage: IPersistentStorage) {
    this.storage = storage;
  }

  public deleteToken(): void {
    this.storage.remove(AuthService.AUTH_KEY);
  }

  public getToken(): string {
    const val = this.storage.get(AuthService.AUTH_KEY);
    if (!val) {
      throw new Error("Token doesn't exist");
    }
    return val;
  }

  public refreshToken(): void {
    const currentToken = this.getToken();
    this.saveToken(currentToken);
  }

  public saveToken(token: string): void {
    this.storage.set(AuthService.AUTH_KEY, token, {
      expires: AuthService.DAY_AFTER_EXPIRED
    });
  }
}
