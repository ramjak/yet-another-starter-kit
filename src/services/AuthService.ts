import IAuthService from './IAuthService';
import ICookieService from './ICookieService';

export default class AuthService implements IAuthService {
  public static readonly AUTH_KEY = '_app_';
  public static readonly DAY_AFTER_EXPIRED = 7;

  private cookieService: ICookieService;

  constructor(cookieService: ICookieService) {
    this.cookieService = cookieService;
  }

  public deleteToken(): void {
    this.cookieService.remove(AuthService.AUTH_KEY);
  }

  public getToken(): string {
    const val = this.cookieService.get(AuthService.AUTH_KEY);
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
    this.cookieService.set(AuthService.AUTH_KEY, token, {
      expires: AuthService.DAY_AFTER_EXPIRED
    });
  }
}
