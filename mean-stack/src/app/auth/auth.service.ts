import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

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
      .post('http://localhost:3000/api/user/login', authData)
      .subscribe((result) => {
        console.log(result);
      });
  }
}
