import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient) { }

  isLoggedIn() {
    return this.http.post('/api/isLoggedIn', {});
  }
}
