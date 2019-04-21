import AuthService from './AuthService';
import { IStorageOptions } from './IPersistentStorage';

const key: string = AuthService.AUTH_KEY;
const initCookieVal = { [key]: 'mockValue' };
let cookieVal = initCookieVal;

const mockCookieService = {
  get: jest.fn((name: string): string | undefined => cookieVal[name]),
  remove: jest.fn(name => delete cookieVal[name]),
  set: jest.fn((name: string, value: string, options?: IStorageOptions) => {
    cookieVal[key] = value;
  })
};

const authService = new AuthService(mockCookieService);

afterEach(() => {
  cookieVal = initCookieVal;
  mockCookieService.get.mockClear();
  mockCookieService.set.mockClear();
});

it('should be able to save token', () => {
  const token = 'mockToken';
  authService.saveToken(token);

  const { calls } = mockCookieService.set.mock;

  expect(calls.length).toBe(1);
  expect(calls && calls[0] && calls[0][1]).toBe(token);
});

it('should be able to retrieve token', () => {
  const res = authService.getToken();

  expect(res).toBe(cookieVal[key]);
});

it('should be able to delete token', () => {
  authService.deleteToken();

  const { calls } = mockCookieService.set.mock;

  expect(calls && calls[0] && calls[0][1]).toBeFalsy();
});

it('should be able to refresh token', () => {
  const oldVal = 'oldVal';
  authService.saveToken(oldVal);
  authService.refreshToken();
  const newVal = authService.getToken();

  const { calls } = mockCookieService.set.mock;

  expect(oldVal).toBe(newVal);
  expect(
    calls && calls[0] && calls[0][2] && calls[0][2].expires
  ).toBeGreaterThan(0);
});
