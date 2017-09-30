import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
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

  insert(slide: DTCarousel) {
    return this.http.post(this.apiUrl+'/carousel/insert',slide, this.jwt());
  }

  delete(_id: string) {
    return this.http.delete(this.apiUrl+'/carousel/' + _id, this.jwt());
  }

  update(slide: DTCarousel) {
    return this.http.put(this.apiUrl+'/carousel/' + slide._id, slide, this.jwt());
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
