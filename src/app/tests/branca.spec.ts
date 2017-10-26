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
import { BrancaService } from '../services/index';
import { Branca } from '../models/';

describe('Branca page Service', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        BrancaService,
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

  it('should return branca',
  inject([BrancaService, MockBackend], (brancaService, mockBackend) => {

    const mockResponse = {title: 'branca 1' , subtitle:'we are cool' , text:'blablabla', _id:'branca1'};

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    brancaService.getById('branca1').then((aboutPage) => {
      expect(aboutPage).toBeTruthy();
      expect(aboutPage._id).toEqual('branca1');
      expect(aboutPage.title).toEqual('branca 1');
      expect(aboutPage.subtitle).toEqual('we are cool');
      expect(aboutPage.text).toEqual('blablabla');
    });

  }));

  it('should insert a branca',
  async(inject([BrancaService, MockBackend], (brancaService, mockBackend) => {

    mockBackend.connections.subscribe((connection: MockConnection) => {
      // is it the correct REST type for an insert? (POST)
      expect(connection.request.method).toBe(RequestMethod.Post);
      // okey dokey,
      connection.mockRespond(new Response(new ResponseOptions({status: 201})));
    });

    let data = {title: 'branca 1' , subtitle:'we are cool' , text:'blablabla' , _id:"branca1"};
    brancaService.insert(data).subscribe(
      (successResult) => {
        expect(successResult).toBeDefined();
        expect(successResult.status).toBe(201);
      });
    })));

    it('should save updates to branca page',
    async(inject([BrancaService, MockBackend], (brancaService, mockBackend) => {
      mockBackend.connections.subscribe(connection => {
        // is it the correct REST type for an update? (PUT)
        expect(connection.request.method).toBe(RequestMethod.Post);
        connection.mockRespond(new Response(new ResponseOptions({status: 204})));
      });

      let data = {title: 'branca 1' , subtitle:'we are cool' , text:'blablabla', _id:'branca1'};

      brancaService.insert(data).subscribe(
        (successResult) => {
          expect(successResult).toBeDefined();
          expect(successResult.status).toBe(204);
        });
      })));

    it('should delete a branca',
    async(inject([BrancaService, MockBackend], (brancaService, mockBackend) => {
      mockBackend.connections.subscribe(connection => {
        expect(connection.request.method).toBe(RequestMethod.Delete);
        connection.mockRespond(new ResponseOptions({status: 204}));
      });

      brancaService.delete('branca1').subscribe(
        (successResult) => {
          expect(successResult).toBeDefined();
          expect(successResult.status).toBe(204);
        },
        (errorResult) => {
          throw (errorResult);
        });
      })));


});
