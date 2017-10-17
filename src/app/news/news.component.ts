import { Component, OnInit } from '@angular/core';
import { NewsDetail } from './news-detail';
import { NewsListComponent } from './news-list';
import { NewsHeaderService} from '../services/newsheader.service';
@Component({
  moduleId: module.id,
  selector:'news-component',
  templateUrl: 'news.component.html'
})
export class NewsComponent implements OnInit{

  info: any;

  constructor(private headerService: NewsHeaderService) {

    this.headerService.info.subscribe((nextValue) => {
      this.info = nextValue;
    })
  }

  ngOnInit() {
    this.headerService.change("Novità", "Nulla che sia del tutto nuovo è perfetto", "(Marco Tullio Cicerone)","assets/images/news.png");
  }
}
