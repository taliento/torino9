import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AService } from './a-service.service';
import { User } from '../models';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService extends AService {

  constructor(http: Http) {
    super(http);
  }

  getAll() {
    return this.http.get(this.apiUrl + '/users', this.jwt()).map((response: Response) => response.json());
  }

  getPaged(params: any) {
    const url = `/users/paged/${params.limit}/${params.page}/${params.size}`;
    return this.http.get(this.apiUrl + url, this.jwt());
  }

  count() {
    return this.http.get(this.apiUrl + '/users/count', this.jwt());
  }

  getById(_id: string) {
    return this.http.get(this.apiUrl + '/users/' + _id, this.jwt()).map((response: Response) => response.json());
  }

  create(user: User) {
    return this.http.post(this.apiUrl + '/users/register', user, this.jwt());
  }

  insertUpload(formData: FormData) {
    return this.http.post(this.apiUrl + '/users/insertUpload', formData, this.jwt());
  }

  update(user: User) {
    return this.http.put(this.apiUrl + '/users/' + user._id, user, this.jwt());
  }

  updateUpload(formData: FormData) {
    return this.http.post(this.apiUrl + '/users/updateUpload/', formData, this.jwt());
  }

  delete(_id: string) {
    return this.http.delete(this.apiUrl + '/users/' + _id, this.jwt());
  }
}
