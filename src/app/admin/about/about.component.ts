import { Component, OnInit, ViewChild } from '@angular/core';
import { AboutPageService, AlertService } from '../../services/index';
import { AboutPage } from '../../models/about-page.model';

@Component({
    moduleId: module.id,
    selector: 'dt-about',
    templateUrl: 'about.component.html'
})

export class AboutComponent implements OnInit {

  @ViewChild('aboutLinks') aboutLinks;

  aboutPage: AboutPage = new AboutPage();

  constructor(private aboutPageService: AboutPageService, private alertService: AlertService) { }

  ngOnInit() {
    this.aboutPageService.get().then(result => this.aboutPage = result);
  }

  save() {

    this.aboutPage.links = this.aboutLinks.getLinks();//prendo i links aggiornati

    if(this.aboutPage._id) {
      this.aboutPageService.update(this.aboutPage)
      .subscribe(
        data => {
          this.alertService.success('Pagina modificata', false);
        },
        error => {
          this.alertService.error(error._body);
        });
    } else {
      this.aboutPageService.insert(this.aboutPage)
      .subscribe(
        data => {
          this.alertService.success('Pagina inserita', false);
        },
        error => {
          this.alertService.error(error._body);
        });
    }
  }
}
