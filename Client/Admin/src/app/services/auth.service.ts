import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly Url = 'https://server-muganim.onrender.com'
  constructor(private httpClient: HttpClient) { }

  loginAdmin(): Observable<any> {
    return this.httpClient.post<any>(`${this.Url}/api/Login`, {});
  }
}
