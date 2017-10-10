import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AService } from './a-service.service';

@Injectable()
export class BrancaService extends AService {

  constructor(http: Http) {
    super(http);
  }

  getById(_id: string) : Promise<any> {
    const url = `/branca/${_id}`;
      return this.http.
      get(this.apiUrl+url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
}
