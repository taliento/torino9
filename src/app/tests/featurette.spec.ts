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
import { FeaturetteService } from '../services/index';
import { Featurette } from '../models';

describe('Featurette Service', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        FeaturetteService,
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

  it('should return all featurette',
  inject([FeaturetteService, MockBackend], (featuretteService, mockBackend) => {

    const mockResponse = [
      { id: 0, title: 'primo' },
      { id: 1, title: 'secondo' }
    ];

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    featuretteService.getAll().then((news) => {
      expect(news).toBeTruthy();
      expect(news.length).toBeGreaterThan(1);
      expect(news[0].title).toEqual('primo');
      expect(news[1].title).toEqual('secondo');
    });

  }));

  it('should return paged featurette',
  inject([FeaturetteService, MockBackend], (featuretteService, mockBackend) => {

    const mockResponse = [
      { id: 0, title: 'primo' },
      { id: 1, title: 'secondo' }
    ];

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    const params = {
      limit: 3,
      page: 1,
      size: 3
    };

    featuretteService.getPaged(params).subscribe((res) => {
      const news = res.json();
      expect(news).toBeTruthy();
      expect(news.length).toBeGreaterThan(1);
      expect(news[0].title).toEqual('primo');
      expect(news[1].title).toEqual('secondo');
    });

  }));

  it('should count featurette',
  inject([FeaturetteService, MockBackend], (featuretteService, mockBackend) => {

    const mockResponse = {'count': 3};

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    featuretteService.count().subscribe((res) => {
      const count = res.json().count;
      expect(count).toEqual(3);
    });

  }));

  it('should insert a featurette',
  async(inject([FeaturetteService, MockBackend], (featuretteService, mockBackend) => {

    mockBackend.connections.subscribe((connection: MockConnection) => {
      // is it the correct REST type for an insert? (POST)
      expect(connection.request.method).toBe(RequestMethod.Post);
      // okey dokey,
      connection.mockRespond(new Response(new ResponseOptions({status: 201})));
    });

    const data: Featurette = new Featurette('Featurette', 'so cool i am', 'blablablabla');
    featuretteService.insert(data).subscribe(
      (successResult) => {
        expect(successResult).toBeDefined();
        expect(successResult.status).toBe(201);
      });
    })));

  it('should save updates to an existing featurette',
  async(inject([FeaturetteService, MockBackend], (featuretteService, mockBackend) => {
    mockBackend.connections.subscribe(connection => {
      // is it the correct REST type for an update? (PUT)
      expect(connection.request.method).toBe(RequestMethod.Put);
      connection.mockRespond(new Response(new ResponseOptions({status: 204})));
    });

    const data: Featurette = new Featurette('News', 'so cool i am', 'blablablabla');
    data._id = '10';

    featuretteService.update(data).subscribe(
      (successResult) => {
        expect(successResult).toBeDefined();
        expect(successResult.status).toBe(204);
      });
    })));

  it('should delete an existing featurette',
  async(inject([FeaturetteService, MockBackend], (featuretteService, mockBackend) => {
    mockBackend.connections.subscribe(connection => {
      expect(connection.request.method).toBe(RequestMethod.Delete);
      connection.mockRespond(new ResponseOptions({status: 204}));
    });

    featuretteService.delete('23').subscribe(
      (successResult) => {
        expect(successResult).toBeDefined();
        expect(successResult.status).toBe(204);
      },
      (errorResult) => {
        throw (errorResult);
      });
    })));

});
