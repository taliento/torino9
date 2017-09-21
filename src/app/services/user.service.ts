import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { environment } from '../../environments/environment';
import { User } from '../models/index';

@Injectable()
export class UserService {
  apiUrl = '';

  constructor(private http: Http) {
    this.apiUrl = environment.apiUrl;
  }

    getAll() {
        return this.http.get(this.apiUrl+'/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get(this.apiUrl+'/users/' + _id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(this.apiUrl+'/users/register', user, this.jwt());
    }

    update(user: User) {
        return this.http.put(this.apiUrl+'/users/' + user._id, user, this.jwt());
    }

    delete(_id: string) {
        return this.http.delete(this.apiUrl+'/users/' + _id, this.jwt());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
