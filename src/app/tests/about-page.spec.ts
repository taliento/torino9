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
import { AboutPageService } from '../shared/services';
import { AboutPage } from '../shared/models';

describe('About Page Service', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        AboutPageService,
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

  it('should return about page',
  inject([AboutPageService, MockBackend], (aboutPageService, mockBackend) => {

    const mockResponse = {title: 'About us' , subtitle: 'we are cool' , text: 'blablabla'};

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    aboutPageService.get().then((aboutPage) => {
      expect(aboutPage).toBeTruthy();
      expect(aboutPage.title).toEqual('About us');
      expect(aboutPage.subtitle).toEqual('we are cool');
      expect(aboutPage.text).toEqual('blablabla');
    });

  }));

  it('should insert an about page',
  async(inject([AboutPageService, MockBackend], (aboutPageService, mockBackend) => {

    mockBackend.connections.subscribe((connection: MockConnection) => {
      // is it the correct REST type for an insert? (POST)
      expect(connection.request.method).toBe(RequestMethod.Post);
      // okey dokey,
      connection.mockRespond(new Response(new ResponseOptions({status: 201})));
    });

    const data = {title: 'About us' , subtitle: 'we are cool' , text: 'blablabla'};
    aboutPageService.insert(data).subscribe(
      (successResult) => {
        console.log('should insert an about page: result' + successResult);
        expect(successResult).toBeDefined();
        expect(successResult.status).toBe(201);
      });
    })));

  it('should save updates to about page',
  async(inject([AboutPageService, MockBackend], (aboutPageService, mockBackend) => {
    mockBackend.connections.subscribe(connection => {
      // is it the correct REST type for an update? (PUT)
      expect(connection.request.method).toBe(RequestMethod.Post);
      connection.mockRespond(new Response(new ResponseOptions({status: 204})));
    });

    const data = {title: 'About us' , subtitle: 'we are cool' , text: 'blablabla', _id: '10'};

    aboutPageService.insert(data).subscribe(
      (successResult) => {
        console.log('should save updates to about page: result' + successResult);
        expect(successResult).toBeDefined();
        expect(successResult.status).toBe(204);
      });
    })));


});
