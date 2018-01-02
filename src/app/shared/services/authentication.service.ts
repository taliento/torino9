import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import { AService } from './a-service.service';
import { User } from '../../shared/models';

@Injectable()
export class AuthenticationService extends AService {
  userValue = new Subject();


  constructor(http: HttpClient) {
    super(http);
  }

  login(username: string, password: string) {
    return this.http.post<User>(this.apiUrl + '/users/authenticate', { username: username, password: password })
    .map((response) => {
      // login successful if there's a jwt token in the response
      const user = response;
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.setUser(user);
      }
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.userValue.next(null);
  }

  setUser(value: User) {
    localStorage.setItem('currentUser', JSON.stringify(value));
    this.userValue.next(value); // this will make sure to tell every subscriber about the change.

  }

  getUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
