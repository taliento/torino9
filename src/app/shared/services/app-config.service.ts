import { Injectable } from '@angular/core';
import { AboutPage } from '../models';
import { Http } from '@angular/http';
import { AService } from './a-service.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppConfigService extends AService {

  appConfig: any = null;

  constructor(http: Http) {
    super(http);
  }

  getTitle(): Observable<string> {
    return this.getConfig().map((response) => {
      this.appConfig = response.json();
      return this.appConfig.title;
    });
  }

  getConfig(): Observable<any> {
    return this.http.get(this.apiUrl + '/config');
  }

  save(config: any): Observable<any> {
    return this.http.post(this.apiUrl + '/config/insert', config, this.jwt());
  }

}
