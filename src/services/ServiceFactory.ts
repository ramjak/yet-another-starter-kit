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
  public getStorageService(): IPersistentStorage {
    return CookieService;
  }
  public getAuthService(): IAuthService {
    const storage = this.getStorageService();
    return new AuthService(storage);
  }
  public getRequestService(): IRequestService {
    const authService = this.getAuthService();
    return new RequestService(authService);
  }
  // noinspection JSMethodCanBeStatic
  public getFirebaseService(): IFirebaseService {
    return FirebaseService.getInstance();
  }
}

export default ServiceFactory;
