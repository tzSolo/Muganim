import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.dto';
import { UserPost } from '../models/user-post.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private readonly Url = 'https://server-muganim.onrender.com/api/Users';
  private readonly Url = 'http://localhost:5208/api/Users';

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.httpClient.get<User[]>(this.Url);
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(this.Url + id);
  }

  addUser(user: UserPost): Observable<User> {
    return this.httpClient.post<User>(`${this.Url}/register`, user);
  }

  updateUserById(id: number, user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.Url}/${id}`, user);
  }

  daleteUserById(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.Url}/${id}`);
  }
}
