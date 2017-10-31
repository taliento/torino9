import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AService {

  apiUrl = '';

  constructor(protected http: Http) {
    this.apiUrl = environment.apiUrl;
  }

  // private helper methods
  protected jwt() {
    // create authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }

  protected jwtBlob() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
    }
  }

  protected handleError(error: any): Promise<any> {// FIXME handle error
    // console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message);
  }
}
