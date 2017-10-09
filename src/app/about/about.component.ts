import { Component, OnInit } from '@angular/core';
import { AboutPage } from '../models/about-page.model';
import { AboutPageService } from '../services/index';

@Component({
  moduleId: module.id,
  selector: 'about-us',
  templateUrl: 'about.component.html'
})
export class AboutUsComponent implements OnInit{

  aboutPage: AboutPage = new AboutPage();

  constructor(private aboutPageService: AboutPageService) {}

  ngOnInit() {
    this.aboutPageService.get().then(result => this.aboutPage = result);
  }
}
