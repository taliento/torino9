import { Component, OnInit } from '@angular/core';
import { AboutPage } from '../shared/models';
import { AboutPageService } from '../shared/services';

@Component({
  moduleId: module.id,
  selector: 'app-about',
  templateUrl: 'about.component.html'
})
export class AboutUsComponent implements OnInit {

  aboutPage: AboutPage = new AboutPage();

  constructor(private aboutPageService: AboutPageService) { }

  ngOnInit() {
    this.aboutPageService.get().then(result => {
      if (result) {
        this.aboutPage = result;
      }
    });
  }
}
