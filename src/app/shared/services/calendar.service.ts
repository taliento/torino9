import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AService } from './a-service.service';
import { Event } from '../models';

@Injectable()
export class CalendarService extends AService {

  constructor(http: Http) {
    super(http);
  }

  getAll(): Promise<Event[]> {
    return this.http.
      get(this.apiUrl + '/calendar')
      .toPromise()
      .then(response => response.json() as Event[])
      .catch(this.handleError);
  }

  getMonthEvents(date: any): Promise<Event[]> {
    return this.http.get(this.apiUrl + `/calendar/month/${date.month}/${date.year}`)
    .toPromise()
    .then(response => response.json() as Event[])
    .catch(this.handleError);
  }

  getById(_id: string): Promise<Event> {
      return this.http.
      get(this.apiUrl + `/calendar/get/${_id}`)
      .toPromise()
      .then(response => response.json() as Event)
      .catch(this.handleError);
  }

  insert(event: Event) {
    return this.http.post(this.apiUrl + '/calendar/insert', event, this.jwt());
  }

  delete(_id: string) {
    return this.http.delete(this.apiUrl + `/calendar/${_id}`, this.jwt());
  }

  update(event: Event) {
    return this.http.put(this.apiUrl + `/calendar/${event._id}`, event, this.jwt());
  }
}
