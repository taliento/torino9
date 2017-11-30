import { Component, OnInit, ViewChild } from '@angular/core';
import { AboutPageService, AlertService } from '../../shared/services';
import { AboutPage } from '../../shared/models';

@Component({
    moduleId: module.id,
    selector: 'app-about',
    templateUrl: 'about.component.html'
})

export class AboutComponent implements OnInit {

  @ViewChild('aboutLinks') aboutLinks;

  aboutPage: AboutPage = new AboutPage();

  constructor(
    private aboutPageService: AboutPageService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.aboutPageService.get().then(result => {
      if (result) {
          this.aboutPage = result;
      }
    });
  }

  save() {
    this.aboutPage.links = this.aboutLinks.getLinks(); // prendo i links aggiornati
    this.aboutPageService.insert(this.aboutPage)
    .subscribe(
      data => {
        this.alertService.success('Pagina modificata', false);
      },
      error => {
        this.alertService.error(error._body);
      });
  }
}
