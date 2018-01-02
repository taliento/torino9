import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AService } from './a-service.service';
import { Branca} from '../models';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class BrancaService extends AService {

  constructor(http: HttpClient) {
    super(http);
  }

  getAll(): Promise<Branca[]> {
    return this.http.
      get<Branca[]>(this.apiUrl + '/branca')
      .toPromise()
      .catch(this.handleError);
  }

  getById(_id: string): Promise<Branca> {
      return this.http.
      get<Branca>(this.apiUrl + `/branca/get/${_id}`)
      .toPromise()
      .catch(this.handleError);
  }

  insert(branca: Branca) : Observable<Branca>{
    return this.http.post<Branca>(this.apiUrl + '/branca/insert', branca);
  }

  insertUpload(formData: FormData): Observable<Branca> {
    return this.http.post<Branca>(this.apiUrl + '/branca/insertUpload', formData);
  }

  delete(_id: string) {
    return this.http.delete(this.apiUrl + `/branca/${_id}`);
  }

}
