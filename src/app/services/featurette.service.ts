import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Featurette } from '../models/featurette.model';
import { AService } from './a-service.service';

@Injectable()
export class FeaturetteService extends AService {

  constructor(http: Http) {
    super(http);
  }

  getAll(): Promise<Featurette[]> {
    return this.http.
      get(this.apiUrl+'/featurette')
      .toPromise()
      .then(response => response.json() as Featurette[])
      .catch(this.handleError);
  }

  getById(_id: string): Promise<Featurette> {
    const url = `/featurette/get/${_id}`;
      return this.http.
      get(this.apiUrl+url)
      .toPromise()
      .then(response => response.json() as Featurette)
      .catch(this.handleError);
  }

  getPaged(params: any) {
    const url = `/featurette/paged/${params.limit}/${params.page}/${params.size}`;
    return this.http.get(this.apiUrl+url);
  }

  insert(featurette: Featurette) {
    return this.http.post(this.apiUrl+'/featurette/insert',featurette, this.jwt());
  }

  delete(_id: string) {
    return this.http.delete(this.apiUrl+'/featurette/' + _id, this.jwt());
  }

  count() {
    return this.http.get(this.apiUrl+'/featurette/count');
  }

  update(slide: Featurette) {
    return this.http.put(this.apiUrl+'/featurette/' + slide._id, slide, this.jwt());
  }
}
