export interface IStorageOptions {
  expires: number;
}

export default interface IPersistenceStorage {
  get(name: string): string | undefined;
  remove(name: string): void;
  set(name: string, value: string, options?: IStorageOptions): void;
}
