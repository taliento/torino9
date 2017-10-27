import { Injectable } from '@angular/core';
import { AboutPage } from '../models/about-page.model';
import { Http } from '@angular/http';
import { AService } from './a-service.service';

@Injectable()
export class AboutPageService extends AService {

  constructor(http: Http) {
    super(http);
  }

  get(): Promise<AboutPage> {
    return this.http.
      get(this.apiUrl + '/about')
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  insert(aboutPage: AboutPage) {
    return this.http.post(this.apiUrl + '/about/insert', aboutPage, this.jwt());
  }

}
