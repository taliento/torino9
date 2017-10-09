import { Injectable } from '@angular/core';
import { AboutPage } from '../models/about-page.model';

@Injectable()
export class AboutPageService{

  getPage() {

    let aboutPage = new AboutPage()
    aboutPage.title = "Siamo il gruppo scout di torino";
    aboutPage.subtitle = "ah yeah";
    aboutPage.text = "fondato nel ecc.. ecc...";


    let links = [];
    links.push({href:"#",text:"vai qui"});
    links.push({href:"#",text:"vai qua"});

    aboutPage.links = links;
    return aboutPage;
  }

}
