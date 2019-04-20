import {
  get as getCookie,
  remove as removeCookie,
  set as setCookie
} from 'es-cookie';
import ICookieService, { ICookieOptions } from './ICookieService';

const cookieService: ICookieService = {
  get(name: string): string | undefined {
    return getCookie(name);
  },
  set(name: string, value: string, options?: ICookieOptions): void {
    setCookie(name, value, options);
  },
  remove(name) {
    removeCookie(name);
  }
};

export default cookieService;
