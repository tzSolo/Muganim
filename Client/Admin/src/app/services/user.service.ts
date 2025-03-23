import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private readonly Url = 'https://server-muganim.onrender.com/api/Users';
  private readonly Url = 'http://localhost:5208/api/Users/';

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.httpClient.get<any>(this.Url);
  }

  getUserById(id: number): Observable<any> {
    return this.httpClient.get<any>(this.Url + id);
  }

  addUser(user: User) {
    return this.httpClient.post<any>(this.Url, user);
  }
  
  updateUserById(id: number, user: User) {
    return this.httpClient.put<any>(this.Url + id, user);
  }

  daleteUserById(id: number) {
    return this.httpClient.delete<any>(this.Url + id);
  }
}
