import { Injectable } from '@angular/core';
import { AboutPage } from '../models/about-page.model';
import { environment } from '../../environments/environment';
import { Headers, Http, RequestOptions } from '@angular/http';

@Injectable()
export class AboutPageService {

  apiUrl = '';

  constructor(private http: Http) {
    this.apiUrl = environment.apiUrl;
  }

  // getPage() {
  //
  //   let aboutPage = new AboutPage()
  //   aboutPage.title = "Siamo il gruppo scout di torino";
  //   aboutPage.subtitle = "ah yeah";
  //   aboutPage.text = "fondato nel ecc.. ecc...";
  //
  //
  //   let links = [];
  //   links.push({href:"#",text:"vai qui"});
  //   links.push({href:"#",text:"vai qua"});
  //
  //   aboutPage.links = links;
  //   return aboutPage;
  // }

  get(): Promise<any> {
    return this.http.
      get(this.apiUrl+'/about')
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  insert(aboutPage: AboutPage) {
    return this.http.post(this.apiUrl+'/about/insert',aboutPage, this.jwt());
  }

  update(aboutPage: AboutPage) {
    return this.http.put(this.apiUrl+'/about/' + aboutPage._id, aboutPage, this.jwt());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  // private helper methods
  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }

}
