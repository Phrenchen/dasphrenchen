import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { API } from 'src/app/constants/API';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }
  
  public createNewUser(): User {
    return {
      name: 'new user',
      ytChannelName: 'yt channel name',
      ytChannelId: '',
      playlists: []
      // ...
    };
  }
  
  public updateUser(user: User): Observable<any> {
    return this.http.post(API.host + '/user/', user);
  }

  public addUser(): Observable<any> {
    return of('added user');
  }

  public removeUser(id: string): Observable<any> {
    return of('removed user');
  }
}
