import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { DTCarousel } from '../models/dt-carousel.model';
import { AppConfig } from '../app.config';

@Injectable()
export class CarouselService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private config: AppConfig) { }

  getAll(): Promise<DTCarousel[]> {
    return this.http.
      get('/carousel')
      .toPromise()
      .then(response => response.json() as DTCarousel[])
      .catch(this.handleError);
  }

  getPaged(params: any) {
    const url = `/carousel/${params.limit}/${params.page}/${params.size}`;
    return this.http.get(url);
  }

  count() {
    return this.http.get(this.config.apiUrl + '/news/count');
  }

  getById(_id: string): Promise<DTCarousel> {
    const url = `/carousel/${_id}`;
      return this.http.
      get(url)
      .toPromise()
      .then(response => response.json() as DTCarousel)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
