import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../shared/services';

@Component({
    moduleId: module.id,
    selector: 'app-footer',
    templateUrl: 'footer.component.html'
})

export class FooterComponent implements OnInit {

  title: string;

  constructor(private appConfigService: AppConfigService) { }

  ngOnInit() {
    this.appConfigService.getTitle().subscribe(result => {
      this.title = (result ? result : 'Scout site' );
    });
  }
}
