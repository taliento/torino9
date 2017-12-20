import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppConfigService } from './shared/services';

@Component({
  selector: 'app-root',
  template: `
  <router-outlet></router-outlet>
  <cookie-law position="bottom">
  Questo sito utilizza i cookie per migliorare l'esperienza degli utenti: continuando a navigare sul sito accetti questo utilizzo e la relativa <a [routerLink]="['/mainlayout/cookie-policy']">policy</a>
  </cookie-law>
  `
})
export class AppComponent implements OnInit {

  public constructor(private titleService: Title,
    private appConfigService: AppConfigService) { }

  ngOnInit() {
    this.appConfigService.getTitle().subscribe(result => {
      this.titleService.setTitle(result ? result : 'Scout site' );
    });
  }

}
