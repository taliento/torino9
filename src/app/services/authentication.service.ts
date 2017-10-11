import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import { AService } from './a-service.service';

@Injectable()
export class AuthenticationService extends AService {
  userValue = new Subject();


  constructor(http: Http) {
    super(http);
  }

  login(username: string, password: string) {
    return this.http.post(this.apiUrl +'/users/authenticate', { username: username, password: password })
    .map((response: Response) => {
      // login successful if there's a jwt token in the response
      let user = response.json();
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

  setUser(value) {
    localStorage.setItem('currentUser', JSON.stringify(value));
    this.userValue.next(value); // this will make sure to tell every subscriber about the change.

  }

  getUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
