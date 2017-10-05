import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

import { Event } from '../models/event';

@Injectable()
export class CalendarService {
  private headers = new Headers({'Content-Type': 'application/json'});

  apiUrl = '';

  constructor(private http: Http) {
    this.apiUrl = environment.apiUrl;
  }

  getAll(): Promise<Event[]> {
    return this.http.
      get(this.apiUrl+'/calendar')
      .toPromise()
      .then(response => response.json() as Event[])
      .catch(this.handleError);
  }

  getPaged(params: any) {
    const url = `/calendar/${params.limit}/${params.page}/${params.size}`;
    return this.http.get(this.apiUrl+url);
  }

  getMonthEvents(date: any): Promise<Event[]> {
    const url = `/calendar/month/${date.month}/${date.year}`;
    return this.http.get(this.apiUrl+url)
    .toPromise()
    .then(response => response.json() as Event[])
    .catch(this.handleError);
  }

  count() {
    return this.http.get(this.apiUrl+ '/calendar/count');
  }

  getById(_id: string): Promise<Event> {
    const url = `/calendar/${_id}`;
      return this.http.
      get(this.apiUrl+url)
      .toPromise()
      .then(response => response.json() as Event)
      .catch(this.handleError);
  }

  insert(slide: Event) {
    return this.http.post(this.apiUrl+'/calendar/insert',slide, this.jwt());
  }

  delete(_id: string) {
    return this.http.delete(this.apiUrl+'/calendar/' + _id, this.jwt());
  }

  update(slide: Event) {
    return this.http.put(this.apiUrl+'/calendar/' + slide._id, slide, this.jwt());
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
