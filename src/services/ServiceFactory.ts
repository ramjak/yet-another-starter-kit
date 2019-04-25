import AuthService from './AuthService';
import CookieService from './CookieService';
import FirebaseService from './FirebaseService';
import IAuthService from './IAuthService';
import IFirebaseService from './IFirebaseService';
import IPersistentStorage from './IPersistentStorage';
import IRequestService from './IRequestService';
import RequestService from './RequestService';

class ServiceFactory {
  // noinspection JSMethodCanBeStatic
  public static getStorageService(): IPersistentStorage {
    return CookieService;
  }
  public static getAuthService(): IAuthService {
    const storage = ServiceFactory.getStorageService();
    return new AuthService(storage);
  }
  public static getRequestService(): IRequestService {
    const authService = ServiceFactory.getAuthService();
    return new RequestService(authService);
  }
  // noinspection JSMethodCanBeStatic
  public static getFirebaseService(): IFirebaseService {
    return FirebaseService.getInstance();
  }
}

export default ServiceFactory;
