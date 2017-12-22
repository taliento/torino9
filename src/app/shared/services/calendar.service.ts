import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AService } from './a-service.service';
import { Event } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CalendarService extends AService {

  constructor(http: HttpClient) {
    super(http);
  }

  getAll(): Promise<Event[]> {
    return this.http.
      get<Event[]>(this.apiUrl + '/calendar')
      .toPromise()
      .catch(this.handleError);
  }

  getMonthEvents(date: any): Promise<Event[]> {
    return this.http.get<Event[]>(this.apiUrl + `/calendar/month/${date.month}/${date.year}`)
    .toPromise()
    .catch(this.handleError);
  }

  getById(_id: string): Promise<Event> {
      return this.http.
      get<Event>(this.apiUrl + `/calendar/get/${_id}`)
      .toPromise()
      .catch(this.handleError);
  }

  insert(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl + '/calendar/insert', event);
  }

  delete(_id: string) {
    return this.http.delete(this.apiUrl + `/calendar/${_id}`);
  }

  update(event: Event) {
    return this.http.put(this.apiUrl + `/calendar/${event._id}`, event);
  }
}
