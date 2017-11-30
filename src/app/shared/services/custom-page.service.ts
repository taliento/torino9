import { Injectable } from '@angular/core';
import { CustomPage } from '../models';
import { AService } from './a-service.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomPageService extends AService {

  constructor(http: Http) {
    super(http);
  }

  getById(_id: string): Promise<CustomPage> {
    return this.http.
    get(this.apiUrl + `/page/get/${_id}`)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  get(): Promise<Array<CustomPage>> {
    return this.http.
      get(this.apiUrl + '/page')
      .toPromise()
      .then(response => response.json() as Array<CustomPage>)
      .catch(this.handleError);
  }

  insert(formData: FormData): Observable<CustomPage> {
    return this.http.post(this.apiUrl + '/page/insertUpload', formData, this.jwt()).map(response => response.json() as CustomPage);
  }

  update(formData: FormData) {
    return this.http.post(this.apiUrl + '/page/updateUpload', formData, this.jwt());
  }
}
