/* tslint:disable:no-unused-variable */

import {
  BaseRequestOptions,
  Response,
  ResponseOptions,
  HttpModule,
  Http,
  XHRBackend,
  RequestMethod
} from '@angular/http';
import { TestBed, fakeAsync, tick, inject, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { CalendarService } from '../shared/services';
import { Event } from '../shared/models';

describe('Calendar Service', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        CalendarService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ]
    });
  });

  it('should return all events',
  inject([CalendarService, MockBackend], (calendarService, mockBackend) => {

    const mockResponse = [
      { title: 'primo', text : 'primo evento' , date: new Date()},
      { title: 'secondo', text : 'secondo evento' , date: new Date() }
    ];

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    calendarService.getAll().then((news) => {
      expect(news).toBeTruthy();
      expect(news.length).toBeGreaterThan(1);
      expect(news[0].title).toEqual('primo');
      expect(news[1].title).toEqual('secondo');
    });

  }));

  it('should return all events by date',
  inject([CalendarService, MockBackend], (calendarService, mockBackend) => {

    const mockResponse = [
      { title: 'primo', text : 'primo evento' , date: new Date()},
      { title: 'secondo', text : 'secondo evento' , date: new Date() }
    ];

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    const date = {month: 5, year: 1987};

    calendarService.getMonthEvents(date).then((news) => {
      expect(news).toBeTruthy();
      expect(news.length).toBeGreaterThan(1);
      expect(news[0].title).toEqual('primo');
      expect(news[1].title).toEqual('secondo');
    });

  }));

  it('should insert a event',
  async(inject([CalendarService, MockBackend], (calendarService, mockBackend) => {

    mockBackend.connections.subscribe((connection: MockConnection) => {
      // is it the correct REST type for an insert? (POST)
      expect(connection.request.method).toBe(RequestMethod.Post);
      // okey dokey,
      connection.mockRespond(new Response(new ResponseOptions({status: 201})));
    });

    const data = { title: 'primo', text : 'primo evento' , date: new Date()};
    calendarService.insert(data).subscribe(
      (successResult) => {
        expect(successResult).toBeDefined();
        expect(successResult.status).toBe(201);
      });
    })));

  it('should save updates to an existing event',
  async(inject([CalendarService, MockBackend], (calendarService, mockBackend) => {
    mockBackend.connections.subscribe(connection => {
      // is it the correct REST type for an update? (PUT)
      expect(connection.request.method).toBe(RequestMethod.Put);
      connection.mockRespond(new Response(new ResponseOptions({status: 204})));
    });

    const data = { title: 'primo', text : 'primo evento' , date: new Date(), _id: '10'};

    calendarService.update(data).subscribe(
      (successResult) => {
        expect(successResult).toBeDefined();
        expect(successResult.status).toBe(204);
      });
    })));

  it('should delete an existing event',
  async(inject([CalendarService, MockBackend], (calendarService, mockBackend) => {
    mockBackend.connections.subscribe(connection => {
      expect(connection.request.method).toBe(RequestMethod.Delete);
      connection.mockRespond(new ResponseOptions({status: 204}));
    });

    calendarService.delete('23').subscribe(
      (successResult) => {
        expect(successResult).toBeDefined();
        expect(successResult.status).toBe(204);
      },
      (errorResult) => {
        throw (errorResult);
      });
    })));

});
