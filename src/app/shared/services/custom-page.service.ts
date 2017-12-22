import { Injectable } from '@angular/core';
import { CustomPage } from '../models';
import { AService } from './a-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomPageService extends AService {

  constructor(http: HttpClient) {
    super(http);
  }

  getById(_id: string): Promise<CustomPage> {
    return this.http.get<CustomPage>(this.apiUrl + `/page/get/${_id}`)
    .toPromise()
    .catch(this.handleError);
  }

  get(): Promise<Array<CustomPage>> {
    return this.http.get<Array<CustomPage>>(this.apiUrl + '/page')
      .toPromise()
      .catch(this.handleError);
  }

  insert(formData: FormData): Observable<CustomPage> {
    return this.http.post<CustomPage>(this.apiUrl + '/page/insertUpload', formData);
  }

  update(formData: FormData) {
    return this.http.post(this.apiUrl + '/page/updateUpload', formData);
  }
}
