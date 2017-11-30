import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AService } from './a-service.service';

import { DTCarousel } from '../models';

@Injectable()
export class CarouselService extends AService {

  constructor(http: Http) {
    super(http);
  }

  getAll(): Promise<DTCarousel[]> {
    return this.http.
      get(this.apiUrl + '/carousel')
      .toPromise()
      .then(response => response.json() as DTCarousel[])
      .catch(this.handleError);
  }

  getPaged(params: any) {
    return this.http.get(this.apiUrl + `/carousel/paged/${params.limit}/${params.page}/${params.size}`);
  }

  count() {
    return this.http.get(this.apiUrl + '/carousel/count');
  }

  getById(_id: string): Promise<DTCarousel> {
      return this.http.
      get(this.apiUrl + `/carousel/get/${_id}`)
      .toPromise()
      .then(response => response.json() as DTCarousel)
      .catch(this.handleError);
  }

  insert(slide: DTCarousel) {
    return this.http.post(this.apiUrl + '/carousel/insert', slide, this.jwt());
  }

  insertUpload(formData: FormData) {
    return this.http.post(this.apiUrl + '/carousel/insertUpload', formData, this.jwt());
  }

  delete(_id: string) {
    return this.http.delete(this.apiUrl + `/carousel/${_id}`, this.jwt());
  }

  update(slide: DTCarousel) {
    return this.http.put(this.apiUrl + `/carousel/${slide._id}`, slide, this.jwt());
  }

  updateUpload(formData: FormData) {
    return this.http.post(this.apiUrl + '/carousel/updateUpload', formData, this.jwt());
  }

}
