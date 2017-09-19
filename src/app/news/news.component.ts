import { Component, OnInit } from '@angular/core';
import { NewsDetail } from './news-detail';
import { NewsListComponent } from './news-list';
import { NewsHeaderService, HeaderInfo} from '../services/newsheader.service';
@Component({
  moduleId: module.id,
  selector:'news-component',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.css']
})
export class NewsComponent implements OnInit{

  info: HeaderInfo;

  constructor(private headerService: NewsHeaderService) {
    this.info = headerService.info;
  }

  ngOnInit() {
    this.headerService.reset();
  }

}
