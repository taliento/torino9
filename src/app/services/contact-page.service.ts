import { Injectable } from '@angular/core';
import { ContactPage } from '../models/contact-page.model';
import { AService } from './a-service.service';
import { Http } from '@angular/http';

@Injectable()
export class ContactPageService extends AService {

  constructor(http: Http) {
    super(http);
  }

  get(): Promise<any> {
    return this.http.
      get(this.apiUrl + '/contact')
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  insert(contactPage: ContactPage) {
    return this.http.post(this.apiUrl + '/contact/insert', contactPage, this.jwt());
  }

}
