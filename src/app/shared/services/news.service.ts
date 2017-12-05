import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AService } from './a-service.service';
import { News } from '../models';

@Injectable()
export class NewsService extends AService {

  constructor(http: Http) {
    super(http);
  }

  getAll(): Promise<News[]> {
    return this.http.
      get(this.apiUrl + '/news')
      .toPromise()
      .then(response => response.json() as News[])
      .catch(this.handleError);
  }

  getPaged(params: any) {
    return this.http.get(this.apiUrl + `/news/paged/${params.limit}/${params.page}/${params.size}`);
  }

  count() {
    return this.http.get(this.apiUrl + '/news/count');
  }

  getById(_id: string): Promise<News> {
      return this.http.
      get(this.apiUrl + `/news/get/${_id}`)
      .toPromise()
      .then(response => response.json() as News)
      .catch(this.handleError);
  }

  insert(news: News) {
    return this.http.post(this.apiUrl + '/news/insert', news, this.jwt());
  }

  delete(_id: string) {
    return this.http.delete(this.apiUrl + `/news/${_id}`, this.jwt());
  }

  update(news: News) {
    return this.http.put(this.apiUrl + `/news/${news._id}`, news, this.jwt());
  }
}