import { auth, database, initializeApp, Unsubscribe } from 'firebase';
import IFirebaseService, { AuthListener } from './IFirebaseService';

export default class FirebaseService implements IFirebaseService {
  public static _instance: FirebaseService;

  public static getInstance() {
    if (!FirebaseService._instance) {
      FirebaseService._instance = new FirebaseService();
    }

    return FirebaseService._instance;
  }
  private _auth: auth.Auth;
  private _dbRoot: database.Reference;
  public _authListeners = new Map<AuthListener, Unsubscribe>();

  private constructor() {
    initializeApp({
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_DATABASE_URL,
      projectId: process.env.REACT_APP_PROJECT_ID
      // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    });
    this._auth = auth();
    this._dbRoot = database().ref();
  }

  public getCurrentUser() {
    return this._auth.currentUser;
  }

  public addAuthListener(callback: AuthListener) {
    // noinspection SpellCheckingInspection
    const unsubscriber = this._auth.onAuthStateChanged(callback);
    this._authListeners.set(callback, unsubscriber);
  }

  public removeAuthListener(callback: AuthListener) {
    // noinspection SpellCheckingInspection
    const unsubscriber = this._authListeners.get(callback);
    unsubscriber && unsubscriber();
  }

  public async signIn(email: string, password: string) {
    await this._auth.signInWithEmailAndPassword(email, password);
  }

  public async signOut() {
    await this._auth.signOut();
  }
}
