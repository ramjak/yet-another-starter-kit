import {
  get as getCookie,
  remove as removeCookie,
  set as setCookie
} from 'es-cookie';
import IPersistenceStorage, { IStorageOptions } from './IPersistenceStorage';

const cookieService: IPersistenceStorage = {
  get(name: string): string | undefined {
    return getCookie(name);
  },
  set(name: string, value: string, options?: IStorageOptions): void {
    setCookie(name, value, options);
  },
  remove(name) {
    removeCookie(name);
  }
};

export default cookieService;
