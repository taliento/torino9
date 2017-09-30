import { Component, OnInit } from '@angular/core';
import { NewsDetail } from './news-detail';
import { NewsListComponent } from './news-list';
import { NewsHeaderService} from '../services/newsheader.service';
@Component({
  moduleId: module.id,
  selector:'news-component',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.css']
})
export class NewsComponent implements OnInit{

  info: any;

  constructor(private headerService: NewsHeaderService) {

    this.headerService.info.subscribe((nextValue) => {
      this.info = nextValue;
    })
  }

  ngOnInit() {
    this.headerService.change("Novità", "Le ultime novità","assets/images/news.png");
  }
}
