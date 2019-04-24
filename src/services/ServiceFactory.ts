import AuthService from './AuthService';
import CookieService from './CookieService';
import FirebaseService from './FirebaseService';
import IAuthService from './IAuthService';
import IFirebaseService from './IFirebaseService';
import IPersistentStorage from './IPersistentStorage';
import IRequestService from './IRequestService';
import RequestService from './RequestService';

export default {
  getStorageService(): IPersistentStorage {
    return CookieService;
  },
  getAuthService(): IAuthService {
    const storage = this.getStorageService();
    return new AuthService(storage);
  },
  getRequestService(): IRequestService {
    const authService = this.getAuthService();
    return new RequestService(authService);
  },
  getFirebaseService(): IFirebaseService {
    return FirebaseService.getInstance();
  }
};
