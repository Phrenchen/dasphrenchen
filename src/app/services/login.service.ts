import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserService } from '../pages/playground/container/my-feeds/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly userService: UserService) { }

  public login(name: string, password: string): Observable<any> {
    return of(true);
  }
}
