import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private readonly Url = 'https://server-muganim.onrender.com/api/Login';
  private readonly Url = 'http://localhost:5208/api/Auth/login';

  constructor(private httpClient: HttpClient) { }

  loginAdmin(user: { name: string, email: string, password: string }): Observable<any> {
    return this.httpClient.post<any>(this.Url, user);
  }
}
