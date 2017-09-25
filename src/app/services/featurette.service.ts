import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
