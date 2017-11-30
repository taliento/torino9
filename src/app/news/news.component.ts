import { Component, OnInit } from '@angular/core';
import { NewsDetailComponent } from './news-detail';
import { NewsListComponent } from './news-list';
import { NewsHeaderService} from '../shared/services';
@Component({
  moduleId: module.id,
  selector: 'app-news',
  templateUrl: 'news.component.html'
})
export class NewsComponent implements OnInit {

  info: any;

  constructor(private headerService: NewsHeaderService) {

    this.headerService.info.subscribe((nextValue) => {
      this.info = nextValue;
    });
  }

  ngOnInit() {
    this.headerService.reset();
  }
}
