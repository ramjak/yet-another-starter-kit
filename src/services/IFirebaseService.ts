import { database } from 'firebase';

export interface IMap<T> {
  [key: string]: T;
}

export interface IFirebaseSnapshot<T> extends database.DataSnapshot {
  val(): IMap<T>;
}

export default interface IFirebaseService {
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
}
