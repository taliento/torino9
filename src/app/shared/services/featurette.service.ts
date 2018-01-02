import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Featurette } from '../models';
import { AService } from './a-service.service';

@Injectable()
export class FeaturetteService extends AService {

  constructor(http: HttpClient) {
    super(http);
  }

  getAll(): Promise<Featurette[]> {
    return this.http.get<Featurette[]>(this.apiUrl + '/featurette')
      .toPromise()
      .catch(this.handleError);
  }

  getById(_id: string): Promise<Featurette> {
      return this.http.get<Featurette>(this.apiUrl + `/featurette/get/${_id}`)
      .toPromise()
      .catch(this.handleError);
  }

  getPaged(params: any): Observable<Featurette[]> {
    return this.http.get<Featurette[]>(this.apiUrl + `/featurette/paged/${params.limit}/${params.page}/${params.size}`);
  }

  insert(featurette: Featurette): Observable<Featurette> {
    return this.http.post<Featurette>(this.apiUrl + '/featurette/insert', featurette);
  }

  insertUpload(formData: FormData): Observable<Featurette> {
    return this.http.post<Featurette>(this.apiUrl + '/featurette/insertUpload', formData);
  }

  delete(_id: string) {
    return this.http.delete(this.apiUrl + `/featurette/${_id}`,{responseType: 'text'});
  }

  count(): Observable<number> {
    return this.http.get<number>(this.apiUrl + '/featurette/count');
  }

  update(slide: Featurette) {
    return this.http.put(this.apiUrl + `/featurette/${slide._id}`, slide);
  }

  updateUpload(formData: FormData) {
    return this.http.post(this.apiUrl + '/featurette/updateUpload', formData);
  }
}
