export interface ICookieOptions {
  expires: number;
}

export default interface ICookieService {
  get(name: string): string | undefined;
  remove(name: string): void;
  set(name: string, value: string, options?: ICookieOptions): void;
}
