import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppConfigService } from './shared/services';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  public constructor(private titleService: Title, private appConfigService: AppConfigService) { }

  ngOnInit() {
    this.appConfigService.getTitle().subscribe(result => {
      this.titleService.setTitle(result ? result : 'Scout site' );
    });
  }

}
