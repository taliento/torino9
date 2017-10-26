import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AService } from './a-service.service';
import { Branca} from '../models';

@Injectable()
export class BrancaService extends AService {

  constructor(http: Http) {
    super(http);
  }

  getAll(): Promise<Branca[]> {
    return this.http.
      get(this.apiUrl+'/branca')
      .toPromise()
      .then(response => response.json() as Branca[])
      .catch(this.handleError);
  }

  getById(_id: string) : Promise<Branca> {
    const url = `/branca/get/${_id}`;
      return this.http.
      get(this.apiUrl+url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  insert(branca: Branca) {
    return this.http.post(this.apiUrl+'/branca/insert',branca, this.jwt());
  }

  insertUpload(formData: FormData) {
    return this.http.post(this.apiUrl+'/branca/insertUpload',formData, this.jwt());
  }

  delete(_id: string) {
    return this.http.delete(this.apiUrl+'/branca/' + _id, this.jwt());
  }

}
