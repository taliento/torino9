import { Injectable } from '@angular/core';
import { ContactPage } from '../models';
import { AService } from './a-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContactPageService extends AService {

  constructor(http: HttpClient) {
    super(http);
  }

  get(): Promise<any> {
    return this.http.
      get<ContactPage>(this.apiUrl + '/contact')
      .toPromise()
      .catch(this.handleError);
  }

  insert(contactPage: ContactPage): Observable<ContactPage> {
    return this.http.post<ContactPage>(this.apiUrl + '/contact/insert', contactPage);
  }

}
