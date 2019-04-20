export default interface IAuthService {
  deleteToken(): void;
  getToken(): string;
  refreshToken(): void;
  saveToken(token: string): void;
}
