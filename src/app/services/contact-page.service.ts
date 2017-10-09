import { Injectable } from '@angular/core';
import { ContactPage } from '../models/contact-page.model';
import { environment } from '../../environments/environment';
import { Headers, Http, RequestOptions } from '@angular/http';

@Injectable()
export class ContactPageService {

  apiUrl = '';

  constructor(private http: Http) {
    this.apiUrl = environment.apiUrl;
  }
  get(): Promise<any> {
    return this.http.
      get(this.apiUrl+'/contact')
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  insert(contactPage: ContactPage) {
    return this.http.post(this.apiUrl+'/contact/insert',contactPage, this.jwt());
  }

  update(contactPage: ContactPage) {
    return this.http.put(this.apiUrl+'/contact/' + contactPage._id, contactPage, this.jwt());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
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
