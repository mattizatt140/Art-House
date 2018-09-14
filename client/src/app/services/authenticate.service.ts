import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  domain: string;
  constructor(private http: HttpClient) {
    this.domain = 'http://localhost:8000';
  }

  registerUser(user) {
    return this.http.post(`${this.domain}/authenticate/register`, user);
  }

  loginUser(user) {
    return this.http.post(`${this.domain}/authenticate/login`, user);
  }

  isLoggedIn() {
    return this.http.post(`${this.domain}/api/isLoggedIn`, {});
  }
}
