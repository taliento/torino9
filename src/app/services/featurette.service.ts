import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Featurette } from '../models/featurette.model';

@Injectable()
export class FeaturetteService {
  private headers = new Headers({'Content-Type': 'application/json'});

  apiUrl = '';

  constructor(private http: Http) {
    this.apiUrl = environment.apiUrl;
  }

  getAll(): Promise<Featurette[]> {
    return this.http.
      get(this.apiUrl+'/featurette')
      .toPromise()
      .then(response => response.json() as Featurette[])
      .catch(this.handleError);
  }

  getPaged(params: any) {
    const url = `/featurette/${params.limit}/${params.page}/${params.size}`;
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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  // private helper methods
  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}
