import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { AService } from './a-service.service';
import { News } from '../models';

@Injectable()
export class NewsService extends AService {

  constructor(http: HttpClient) {
    super(http);
  }

  getAll(): Promise<News[]> {
    return this.http.get<News[]>(this.apiUrl + '/news')
      .toPromise()
      .catch(this.handleError);
  }

  getPaged(params: any): Observable<News[]> {
    return this.http.get<News[]>(this.apiUrl + `/news/paged/${params.limit}/${params.page}/${params.size}/${params.date}`);
  }

  count(date: any): Observable<number> {
    return this.http.get<number>(this.apiUrl + `/news/count/${date}`);
  }

  getById(_id: string): Promise<News> {
      return this.http.get<News>(this.apiUrl + `/news/get/${_id}`)
      .toPromise()
      .catch(this.handleError);
  }

  getArchivesDate(): Promise<any> {// FIXME type
    return this.http.get(this.apiUrl + '/news/archivesDate')
      .toPromise()
      .then((response) => {
        console.log(response.valueOf());
        return response.valueOf()[0].distinctDate;

      } )
      .catch(this.handleError);
  }

  insert(news: News): Observable<News> {
    return this.http.post<News>(this.apiUrl + '/news/insert', news);
  }

  delete(_id: string) {
    return this.http.delete(this.apiUrl + `/news/${_id}`);
  }

  update(news: News) {
    return this.http.put(this.apiUrl + `/news/${news._id}`, news);
  }
}
