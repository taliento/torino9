import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {Subject} from 'rxjs/Subject';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  apiUrl = '';
  userValue = new Subject();


  constructor(private http: Http) {
    this.apiUrl = environment.apiUrl;
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
      this.userValue.next(value); // this will make sure to tell every subscriber about the change.
      localStorage.setItem('currentUser', JSON.stringify(value));
    }

    getUser() {
      return JSON.parse(localStorage.getItem('currentUser'));
    }
}
