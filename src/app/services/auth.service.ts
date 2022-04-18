import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Login } from "../models/login.model";
import { Register } from "../models/register.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _url = 'https://localhost:44335';

  constructor(private http: HttpClient) { }

  login(cred: any) {
    const credentials = JSON.stringify(cred);
    return this.http.post<Login>(`${this._url}/api/Auth/Login`, credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  register(cred: Register) {
    const credentials = JSON.stringify(cred);
    return this.http.post<Register>(`${this._url}/api/Auth/Register`, credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  logout() {
    return this.http.post(`${this._url}/api/Auth/Logout`, {}, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      })
    })
  }

  getProfile() {
    return this.http.post(`${this._url}/api/Profile/GetProfile`, {}, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      })
    })
  }
}
