import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AService } from './a-service.service';
import { Event } from '../models/event';

@Injectable()
export class CalendarService extends AService {

  constructor(http: Http) {
    super(http);
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

  insert(event: Event) {
    return this.http.post(this.apiUrl+'/calendar/insert',event, this.jwt());
  }

  delete(_id: string) {
    return this.http.delete(this.apiUrl+'/calendar/' + _id, this.jwt());
  }

  deleteMany(_ids: any) {
    return this.http.post(this.apiUrl+'/calendar/deleteMany',_ids, this.jwt());
  }

  update(event: Event) {
    return this.http.put(this.apiUrl+'/calendar/' + event._id, event, this.jwt());
  }
}
