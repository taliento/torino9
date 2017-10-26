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
import { AuthenticationService } from '../services/index';

describe('Authentication Service', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        AuthenticationService,
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

  it('should login user',
  inject([AuthenticationService, MockBackend], (authenticationService, mockBackend) => {

    const mockResponse = {username: 'test' , password:'test', token:'blabla'};

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    authenticationService.userValue.subscribe((nextValue) => {
      expect(nextValue).toBeDefined();
      expect(nextValue.username).toEqual('test');
      expect(nextValue.password).toEqual('test');
      expect(nextValue.token).toEqual('blabla');
    });

    authenticationService.login('test','test').subscribe(response => {
      expect(response).toBeUndefined();
    });

  }));

});
