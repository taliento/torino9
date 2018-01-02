import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AService } from './a-service.service';
import { User } from '../models';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService extends AService {

  constructor(http: HttpClient) {
    super(http);
  }

  getAll(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.apiUrl + '/users');
  }

  getPaged(params: any): Observable<Array<User>> {
    const url = `/users/paged/${params.limit}/${params.page}/${params.size}`;
    return this.http.get<Array<User>>(this.apiUrl + url);
  }

  count(): Observable<number> {
    return this.http.get<number>(this.apiUrl + '/users/count');
  }

  getById(_id: string): Observable<User>  {
    return this.http.get<User>(this.apiUrl + `/users/${_id}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/users/register', user);
  }

  insertUpload(formData: FormData): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/users/insertUpload', formData);
  }

  update(user: User) {
    return this.http.put(this.apiUrl + `/users/${user._id}`, user);
  }

  updateUpload(formData: FormData) {
    return this.http.post(this.apiUrl + '/users/updateUpload', formData);
  }

  delete(_id: string) {
    return this.http.delete(this.apiUrl + `/users/${_id}`,{responseType: 'text'});
  }
}
