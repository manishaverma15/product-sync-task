import { LocalStorageKeys } from "./constants";

export class LocalStorageService {
  static setItem(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  };

  static getItem(key: string) {
    try {
      const data = localStorage.getItem(key);
      return JSON.parse(data || '');
    } catch (err: any) {
      return null;
    }
  }
  
  static getUserToken() {
    return LocalStorageService.getItem(LocalStorageKeys.UserToken);
  }

  static removeItem(key: string) { 
    localStorage.removeItem(key);
  }
}