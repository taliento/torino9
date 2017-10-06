import { Component, OnInit } from '@angular/core';
import { AboutPage } from '../../models/about-page.model';
import { AboutPageService } from '../../services/index';

@Component({
  moduleId: module.id,
  selector: 'about-us',
  templateUrl: 'about.component.html',
  styleUrls: ['../home.component.css']
})
export class AboutUsComponent implements OnInit{

  aboutPage: AboutPage;

  constructor(private aboutPageService: AboutPageService) {}

  ngOnInit() {
    this.aboutPage = this.aboutPageService.getPage();
  }
}
