import AuthService from './AuthService';
import CookieService from './CookieService';
import IAuthService from './IAuthService';
import ICookieService from './ICookieService';
import IRequestService from './IRequestService';
import RequestService from './RequestService';

export default {
  getCookieService(): ICookieService {
    return CookieService;
  },
  getAuthService(): IAuthService {
    const cookieService = this.getCookieService();
    return new AuthService(cookieService);
  },
  getRequestService(): IRequestService {
    const authService = this.getAuthService();
    return new RequestService(authService);
  }
};
