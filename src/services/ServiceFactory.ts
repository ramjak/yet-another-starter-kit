import AuthService from './AuthService';
import CookieService from './CookieService';
import IAuthService from './IAuthService';
import IPersistenceStorage from './IPersistenceStorage';
import IRequestService from './IRequestService';
import RequestService from './RequestService';

export default {
  getStorageService(): IPersistenceStorage {
    return CookieService;
  },
  getAuthService(): IAuthService {
    const storage = this.getStorageService();
    return new AuthService(storage);
  },
  getRequestService(): IRequestService {
    const authService = this.getAuthService();
    return new RequestService(authService);
  }
};
