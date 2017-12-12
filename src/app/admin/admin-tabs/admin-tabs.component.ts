import { Component, OnInit } from '@angular/core';
import { TABS } from './admin-tabs.config';

@Component({
    moduleId: module.id,
    selector: 'app-admin-tabs',
    templateUrl: './admin-tabs.component.html'
})

export class AdminTabsComponent implements OnInit {

  tabs: any[] = [];

  ngOnInit() {
    this.tabs = TABS;
  }
}
