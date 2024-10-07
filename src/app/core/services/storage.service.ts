import { Injectable } from '@angular/core';
import { AuthResponseToken } from '../models/auth-response-token';

const USER_KEY = 'app_lab_auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  authResponseToken: AuthResponseToken = {};

  constructor() {}

  clean(): void {
    localStorage.clear();
  }

  public saveUser(user: AuthResponseToken): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): AuthResponseToken {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return this.authResponseToken;
  }

  public isLoggedIn(): boolean {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}