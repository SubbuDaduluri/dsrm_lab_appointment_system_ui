import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AuthResponseToken } from '../models/auth-response-token';
import { Login } from '../models/login';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

const AUTH_API = 'http://localhost:8086/api/v1/gateway';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService
  ) {
  }
  login(login: Login): Observable<AuthResponseToken> {
    return this.http.post<AuthResponseToken>(
      AUTH_API + '/authenticate',
      login,
      httpOptions
    ).pipe(map(authResponseToken => {
      this.storageService.saveUser(authResponseToken);
      return authResponseToken;
    }));;
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout() {
    this.storageService.clean();
   this.router.navigate(['/login']);
  }
}
