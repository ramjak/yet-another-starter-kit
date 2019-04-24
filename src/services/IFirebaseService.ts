import { database, User } from 'firebase';
import IAttendance from '../modules/attendance/models/IAttendance';

export interface IMap<T> {
  [key: string]: T;
}

export interface IFirebaseSnapshot<T> extends database.DataSnapshot {
  val(): IMap<T>;
}

export type AuthListener = (user: User | null) => void;

export default interface IFirebaseService {
  addAuthListener(callback: (user: User | null) => void): void;
  getCurrentUser(): User | null;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  removeAuthListener(callback: AuthListener): void;
  addAttendanceListener(callback: AttendanceListener): void;
  removeAttendanceListener(callback: AttendanceListener): void;
}

export type AttendanceListener = (
  snapshot: IFirebaseSnapshot<IAttendance> | null
) => void;


