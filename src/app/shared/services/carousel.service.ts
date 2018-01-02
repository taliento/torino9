import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AService } from './a-service.service';
import { DTCarousel } from '../models';

@Injectable()
export class CarouselService extends AService {

  constructor(http: HttpClient) {
    super(http);
  }

  getAll(): Promise<DTCarousel[]> {
    return this.http.get<DTCarousel[]>(this.apiUrl + '/carousel')
      .toPromise()
      .catch(this.handleError);
  }

  getPaged(params: any): Observable<DTCarousel[]> {
    return this.http.get<DTCarousel[]>(this.apiUrl + `/carousel/paged/${params.limit}/${params.page}/${params.size}`);
  }

  count(): Observable<number> {
    return this.http.get<number>(this.apiUrl + '/carousel/count');
  }

  getById(_id: string): Promise<DTCarousel> {
      return this.http.get<DTCarousel>(this.apiUrl + `/carousel/get/${_id}`)
      .toPromise()
      .catch(this.handleError);
  }

  insert(slide: DTCarousel): Observable<DTCarousel> {
    return this.http.post<DTCarousel>(this.apiUrl + '/carousel/insert', slide);
  }

  insertUpload(formData: FormData): Observable<DTCarousel> {
    return this.http.post<DTCarousel>(this.apiUrl + '/carousel/insertUpload', formData);
  }

  delete(_id: string) {
    return this.http.delete(this.apiUrl + `/carousel/${_id}`);
  }

  update(slide: DTCarousel) {
    return this.http.put(this.apiUrl + `/carousel/${slide._id}`, slide);
  }

  updateUpload(formData: FormData) {
    return this.http.post(this.apiUrl + '/carousel/updateUpload', formData);
  }

}
