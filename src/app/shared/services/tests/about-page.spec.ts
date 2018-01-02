import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AboutPageService } from '../';
import { environment } from '../../../../environments/environment';
import { AboutPage } from '../../models';

describe('AboutPageService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AboutPageService
      ]
    });
  });

  it(
    'should return about page',
    inject(
      [HttpTestingController, AboutPageService],
      (
        httpMock: HttpTestingController,
        dataService: AboutPageService
      ) => {
        const mockBody = {title:'test',subtitle:'test',text:'test'};

        dataService.get()
        .then((res: any) => {
          expect(res).toEqual(mockBody);
        });

        let countryRequest = httpMock.expectOne(environment.apiUrl + '/about');
        countryRequest.flush(mockBody);

        httpMock.verify();
      }
    )
  );

  it(
    'should insert an about page',
    async(inject(
      [HttpTestingController, AboutPageService],
      (
        httpMock: HttpTestingController,
        dataService: AboutPageService
      ) => {

        const data = {title: 'About us' , subtitle: 'we are cool' , text: 'blablabla'};
        dataService.insert(data as AboutPage).subscribe(
         (successResult) => {
           console.log('should insert an about page: result' + successResult);
           expect(successResult).toBeDefined();
         });

        let countryRequest = httpMock.expectOne(environment.apiUrl + '/about/insert');
        countryRequest.flush(data);

        httpMock.verify();
      }
    ))
  );

  it(
    'should save updates to about page',
    async(inject(
      [HttpTestingController, AboutPageService],
      (
        httpMock: HttpTestingController,
        dataService: AboutPageService
      ) => {

        const data = {title: 'About us' , subtitle: 'we are cool' , text: 'blablabla', _id: '10'};
        dataService.insert(data as AboutPage).subscribe(
         (successResult) => {
           console.log('should insert an about page: result' + successResult);
           expect(successResult).toBeDefined();
         });

        let countryRequest = httpMock.expectOne(environment.apiUrl + '/about/insert');
        countryRequest.flush(data);

        httpMock.verify();
      }
    ))
  );

});
