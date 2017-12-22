import { Injectable } from '@angular/core';
import { AboutPage } from '../models';
import { HttpClient } from '@angular/common/http';
import { AService } from './a-service.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AboutPageService extends AService {

  constructor(http: HttpClient) {
    super(http);
  }

  get(): Promise<AboutPage> {
    return this.http.get<AboutPage>(this.apiUrl + '/about')
      .toPromise()
      .catch(this.handleError);
  }

  insert(aboutPage: AboutPage): Observable<AboutPage> {
    return this.http.post<AboutPage>(this.apiUrl + '/about/insert', aboutPage);
  }

}
