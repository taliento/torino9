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
import { ContactPageService } from '../services/index';
import { ContactPage } from '../models/';

describe('Contact Page Service', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ContactPageService,
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

  it('should return contact page',
  inject([ContactPageService, MockBackend], (contactPageService, mockBackend) => {

    const mockResponse = {title: 'Contact us' , subtitle: 'we are waiting for you' , text: 'blablabla'};

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    contactPageService.get().then((aboutPage) => {
      expect(aboutPage).toBeTruthy();
      expect(aboutPage.title).toEqual('Contact us');
      expect(aboutPage.subtitle).toEqual('we are waiting for you');
      expect(aboutPage.text).toEqual('blablabla');
    });

  }));

  it('should insert a contact page',
  async(inject([ContactPageService, MockBackend], (contactPageService, mockBackend) => {

    mockBackend.connections.subscribe((connection: MockConnection) => {
      // is it the correct REST type for an insert? (POST)
      expect(connection.request.method).toBe(RequestMethod.Post);
      // okey dokey,
      connection.mockRespond(new Response(new ResponseOptions({status: 201})));
    });

    const data = {title: 'Contact us' , subtitle: 'we are waiting for you' , text: 'blablabla'};
    contactPageService.insert(data).subscribe(
      (successResult) => {
        expect(successResult).toBeDefined();
        expect(successResult.status).toBe(201);
      });
    })));

  // it('should save updates to contact page',
  // async(inject([ContactPageService, MockBackend], (contactPageService, mockBackend) => {
  //   mockBackend.connections.subscribe(connection => {
  //     // is it the correct REST type for an update? (PUT)
  //     expect(connection.request.method).toBe(RequestMethod.Put);
  //     connection.mockRespond(new Response(new ResponseOptions({status: 204})));
  //   });
  //
  //   const data = {title: 'Contact us' , subtitle: 'we are waiting for you' , text: 'blablabla', _id: '10'};
  //
  //   contactPageService.update(data).subscribe(
  //     (successResult) => {
  //       expect(successResult).toBeDefined();
  //       expect(successResult.status).toBe(204);
  //     });
  //   })));


});
