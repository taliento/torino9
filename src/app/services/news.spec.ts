/* tslint:disable:no-unused-variable */

import {
  BaseRequestOptions,
  Response,
  ResponseOptions,
  HttpModule,
  Http,
  XHRBackend,
  RequestMethod
} from "@angular/http";
import { TestBed, fakeAsync, tick, inject, async } from '@angular/core/testing';
import { MockBackend,MockConnection } from "@angular/http/testing";
import { NewsService } from './news.service';
import { News } from '../models/news.model';

describe('News Service', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        NewsService,
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

  it('should return all news',
  inject([NewsService, MockBackend], (newsService, mockBackend) => {

    const mockResponse = [
      { id: 0, title: 'primo' },
      { id: 1, title: 'secondo' }
    ];

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    newsService.getAll().then((news) => {
      expect(news).toBeTruthy();
      expect(news.length).toBeGreaterThan(1);
      expect(news[0].title).toEqual('primo');
      expect(news[1].title).toEqual('secondo');
    });

  }));

  it('should return paged news',
  inject([NewsService, MockBackend], (newsService, mockBackend) => {

    const mockResponse = [
      { id: 0, title: 'primo' },
      { id: 1, title: 'secondo' }
    ];

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    let params = {limit:3,page:1,size:3};

    newsService.getPaged(params).subscribe((res) => {
      let news = res.json();
      expect(news).toBeTruthy();
      expect(news.length).toBeGreaterThan(1);
      expect(news[0].title).toEqual('primo');
      expect(news[1].title).toEqual('secondo');
    });

  }));

  it('should count news',
  inject([NewsService, MockBackend], (newsService, mockBackend) => {

    const mockResponse = {'count':3};

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    newsService.count().subscribe((res) => {
      let count = res.json().count;
      expect(count).toEqual(3)
    });

  }));

  it('should insert a news',
  async(inject([NewsService, MockBackend], (newsService, mockBackend) => {

    mockBackend.connections.subscribe((connection: MockConnection) => {
      // is it the correct REST type for an insert? (POST)
      expect(connection.request.method).toBe(RequestMethod.Post);
      // okey dokey,
      connection.mockRespond(new Response(new ResponseOptions({status: 201})));
    });

    let data: News = new News('News', 'the latest news', 'blablablabla');
    newsService.insert(data).subscribe(
      (successResult) => {
        expect(successResult).toBeDefined();
        expect(successResult.status).toBe(201);
      });
    })));

  it('should save updates to an existing news',
  async(inject([NewsService, MockBackend], (newsService, mockBackend) => {
    mockBackend.connections.subscribe(connection => {
      // is it the correct REST type for an update? (PUT)
      expect(connection.request.method).toBe(RequestMethod.Put);
      connection.mockRespond(new Response(new ResponseOptions({status: 204})));
    });

    let data: News = new News('News', 'the latest news', 'blablablabla');
    data._id = '10';

    newsService.update(data).subscribe(
      (successResult) => {
        expect(successResult).toBeDefined();
        expect(successResult.status).toBe(204);
      });
    })));

  it('should delete an existing news',
  async(inject([NewsService, MockBackend], (newsService, mockBackend) => {
    mockBackend.connections.subscribe(connection => {
      expect(connection.request.method).toBe(RequestMethod.Delete);
      connection.mockRespond(new ResponseOptions({status: 204}));
    });

    newsService.delete('23').subscribe(
      (successResult) => {
        expect(successResult).toBeDefined();
        expect(successResult.status).toBe(204);
      },
      (errorResult) => {
        throw (errorResult);
      });
    })));

});
