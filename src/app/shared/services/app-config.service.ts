import { Injectable } from '@angular/core';
import { AppConfig } from '../models';
import { HttpClient } from '@angular/common/http';
import { AService } from './a-service.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppConfigService extends AService {

  appConfig: AppConfig = new AppConfig;

  constructor(http: HttpClient) {
    super(http);
  }

  getTitle(): Observable<string> {
    return this.getConfig().map((response) => {
      this.appConfig = response;
      return this.appConfig.title;
    });
  }

  getConfig(): Observable<AppConfig> {
    return this.http.get<AppConfig>(this.apiUrl + '/config');
  }

  save(config: AppConfig): Observable<AppConfig> {
    return this.http.post<AppConfig>(this.apiUrl + '/config/insert', config);
  }

}
