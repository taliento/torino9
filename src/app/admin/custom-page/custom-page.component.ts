import { Component, OnInit } from '@angular/core';
import { CustomPage } from '../../shared/models';
import { CustomPageService, AlertService } from '../../shared/services';

@Component({
  moduleId: module.id,
  selector: 'app-custom-page',
  templateUrl: 'custom-page.component.html'
})
export class CustomPageComponent implements OnInit {

  pages: Array<CustomPage> = null;

  constructor(private alertService: AlertService,
    private customPageService: CustomPageService) {}

  ngOnInit() {
    this.loadPages();
  }

  loadPages() {
    this.customPageService.getList().then(list => this.pages = list);
  }
}
