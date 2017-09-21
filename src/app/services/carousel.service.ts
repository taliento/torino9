import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

import { DTCarousel } from '../models/dt-carousel.model';

@Injectable()
export class CarouselService {
  private headers = new Headers({'Content-Type': 'application/json'});

  apiUrl = '';

  constructor(private http: Http) {
    this.apiUrl = environment.apiUrl;
  }

  getAll(): Promise<DTCarousel[]> {
    return this.http.
      get(this.apiUrl+'/carousel')
      .toPromise()
      .then(response => response.json() as DTCarousel[])
      .catch(this.handleError);
  }

  getPaged(params: any) {
    const url = `/carousel/${params.limit}/${params.page}/${params.size}`;
    return this.http.get(this.apiUrl+url);
  }

  count() {
    return this.http.get(this.apiUrl+ '/news/count');
  }

  getById(_id: string): Promise<DTCarousel> {
    const url = `/carousel/${_id}`;
      return this.http.
      get(this.apiUrl+url)
      .toPromise()
      .then(response => response.json() as DTCarousel)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
