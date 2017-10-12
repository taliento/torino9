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
import { UserService } from './index';
import { User } from '../models/user.model';

describe('Users Service', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        UserService,
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

  it('should return all user',
  inject([UserService, MockBackend], (userService, mockBackend) => {

    const mockResponse = [
      { id: 0, title: 'primo' },
      { id: 1, title: 'secondo' }
    ];

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    userService.getAll().subscribe((user) => {
      expect(user).toBeTruthy();
      expect(user.length).toBeGreaterThan(1);
      expect(user[0].title).toEqual('primo');
      expect(user[1].title).toEqual('secondo');
    });

  }));

  it('should return paged user',
  inject([UserService, MockBackend], (userService, mockBackend) => {

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

    userService.getPaged(params).subscribe((res) => {
      let user = res.json();
      expect(user).toBeTruthy();
      expect(user.length).toBeGreaterThan(1);
      expect(user[0].title).toEqual('primo');
      expect(user[1].title).toEqual('secondo');
    });

  }));

  it('should count user',
  inject([UserService, MockBackend], (userService, mockBackend) => {

    const mockResponse = {'count':3};

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    userService.count().subscribe((res) => {
      let count = res.json().count;
      expect(count).toEqual(3)
    });

  }));

  it('should insert a user',
  async(inject([UserService, MockBackend], (userService, mockBackend) => {

    mockBackend.connections.subscribe((connection: MockConnection) => {
      // is it the correct REST type for an insert? (POST)
      expect(connection.request.method).toBe(RequestMethod.Post);
      // okey dokey,
      connection.mockRespond(new Response(new ResponseOptions({status: 201})));
    });

    let data = {username:'test',pasword:'test'};

    userService.create(data).subscribe(
      (successResult) => {
        expect(successResult).toBeDefined();
        expect(successResult.status).toBe(201);
      });
    })));

  it('should save updates to an existing user',
  async(inject([UserService, MockBackend], (userService, mockBackend) => {
    mockBackend.connections.subscribe(connection => {
      // is it the correct REST type for an update? (PUT)
      expect(connection.request.method).toBe(RequestMethod.Put);
      connection.mockRespond(new Response(new ResponseOptions({status: 204})));
    });

    let data = {username:'test',pasword:'test',_id: '10'};

    userService.update(data).subscribe(
      (successResult) => {
        expect(successResult).toBeDefined();
        expect(successResult.status).toBe(204);
      });
    })));

  it('should delete an existing user',
  async(inject([UserService, MockBackend], (userService, mockBackend) => {
    mockBackend.connections.subscribe(connection => {
      expect(connection.request.method).toBe(RequestMethod.Delete);
      connection.mockRespond(new ResponseOptions({status: 204}));
    });

    userService.delete('23').subscribe(
      (successResult) => {
        expect(successResult).toBeDefined();
        expect(successResult.status).toBe(204);
      },
      (errorResult) => {
        throw (errorResult);
      });
    })));

});
