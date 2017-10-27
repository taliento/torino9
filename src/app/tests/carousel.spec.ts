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
import { CarouselService } from '../services/index';
import { DTCarousel } from '../models/dt-carousel.model';

describe('Carousel Service', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        CarouselService,
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

  it('should return all slide',
  inject([CarouselService, MockBackend], (carouselService, mockBackend) => {

    const mockResponse = [
      { id: 0, title: 'primo' },
      { id: 1, title: 'secondo' }
    ];

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    carouselService.getAll().then((news) => {
      expect(news).toBeTruthy();
      expect(news.length).toBeGreaterThan(1);
      expect(news[0].title).toEqual('primo');
      expect(news[1].title).toEqual('secondo');
    });

  }));

  it('should return paged slide',
  inject([CarouselService, MockBackend], (carouselService, mockBackend) => {

    const mockResponse = [
      { id: 0, title: 'primo' },
      { id: 1, title: 'secondo' }
    ];

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    const params = {limit: 3, page: 1, size: 3};

    carouselService.getPaged(params).subscribe((res) => {
      const news = res.json();
      expect(news).toBeTruthy();
      expect(news.length).toBeGreaterThan(1);
      expect(news[0].title).toEqual('primo');
      expect(news[1].title).toEqual('secondo');
    });

  }));

  it('should count slide',
  inject([CarouselService, MockBackend], (carouselService, mockBackend) => {

    const mockResponse = {'count': 3};

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    carouselService.count().subscribe((res) => {
      const count = res.json().count;
      expect(count).toEqual(3);
    });

  }));

  it('should insert a slide',
  async(inject([CarouselService, MockBackend], (carouselService, mockBackend) => {

    mockBackend.connections.subscribe((connection: MockConnection) => {
      // is it the correct REST type for an insert? (POST)
      expect(connection.request.method).toBe(RequestMethod.Post);
      // okey dokey,
      connection.mockRespond(new Response(new ResponseOptions({status: 201})));
    });

    const data = {title: 'slide1' , text: 'the first slide'};

    carouselService.insert(data).subscribe(
      (successResult) => {
        expect(successResult).toBeDefined();
        expect(successResult.status).toBe(201);
      });
    })));

  it('should save updates to an existing slide',
  async(inject([CarouselService, MockBackend], (carouselService, mockBackend) => {
    mockBackend.connections.subscribe(connection => {
      // is it the correct REST type for an update? (PUT)
      expect(connection.request.method).toBe(RequestMethod.Put);
      connection.mockRespond(new Response(new ResponseOptions({status: 204})));
    });

    const data = {title: 'slide1' , text: 'the first slide', _id: '10'};

    carouselService.update(data).subscribe(
      (successResult) => {
        expect(successResult).toBeDefined();
        expect(successResult.status).toBe(204);
      });
    })));

  it('should delete an existing slide',
  async(inject([CarouselService, MockBackend], (carouselService, mockBackend) => {
    mockBackend.connections.subscribe(connection => {
      expect(connection.request.method).toBe(RequestMethod.Delete);
      connection.mockRespond(new ResponseOptions({status: 204}));
    });

    carouselService.delete('23').subscribe(
      (successResult) => {
        expect(successResult).toBeDefined();
        expect(successResult.status).toBe(204);
      },
      (errorResult) => {
        throw (errorResult);
      });
    })));

});
