import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  private isAuthenticated = false;
  private tokenTimer: any;
  private authStateListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getAuthStateListener() {
    return this.authStateListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http
      .post('http://localhost:3000/api/user/signup', authData)
      .subscribe((result) => {
        console.log(result);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http
      .post<{ token: string; expiresIn: number }>(
        'http://localhost:3000/api/user/login',
        authData
      )
      .subscribe((result) => {
        const token = result.token;
        this.token = token;
        if (token) {
          const expiresInDuration = result.expiresIn;
          console.log(expiresInDuration);
          this.tokenTimer = setTimeout(() => {
            this.logout();
          }, expiresInDuration);
          this.isAuthenticated = true;
          this.authStateListener.next(true);
          this.router.navigate(['/']);
        }
      });
  }

  logout() {
    clearTimeout(this.tokenTimer);
    this.token = null;
    this.isAuthenticated = false;
    this.authStateListener.next(false);
    this.router.navigate(['/']);
  }
}
