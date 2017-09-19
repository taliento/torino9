import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { News } from '../models/news.model'
import { AppConfig } from '../app.config';

@Injectable()
export class NewsService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private config: AppConfig) { }

  getAll(): Promise<News[]> {
    return this.http.
      get('/news')
      .toPromise()
      .then(response => response.json() as News[])
      .catch(this.handleError);
  }

  getPagedNews(params: any) {
    const url = `/news/${params.limit}/${params.page}/${params.size}`;
    return this.http.get(url);
  }

  count() {
    return this.http.get('/news/count');
  }

  getById(_id: string): Promise<News> {
    const url = `/news/${_id}`;
      return this.http.
      get(url)
      .toPromise()
      .then(response => response.json() as News)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
