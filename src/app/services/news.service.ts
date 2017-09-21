import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { News } from '../models/news.model'

@Injectable()
export class NewsService {
  private headers = new Headers({'Content-Type': 'application/json'});

  apiUrl = '';

  constructor(private http: Http) {
    this.apiUrl = environment.apiUrl;
  }

  getAll(): Promise<News[]> {
    return this.http.
      get(this.apiUrl+'/news')
      .toPromise()
      .then(response => response.json() as News[])
      .catch(this.handleError);
  }

  getPagedNews(params: any) {
    const url = `/news/${params.limit}/${params.page}/${params.size}`;
    return this.http.get(this.apiUrl+url);
  }

  count() {
    return this.http.get(this.apiUrl+'/news/count');
  }

  getById(_id: string): Promise<News> {
    const url = `/news/${_id}`;
      return this.http.
      get(this.apiUrl+url)
      .toPromise()
      .then(response => response.json() as News)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
