import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NewsService} from '../../services/news.service';
import { News } from '../../models/news.model';
import { NewsHeaderService, HeaderInfo} from '../../services/newsheader.service';
import 'rxjs/add/operator/switchMap';
@Component({
  moduleId: module.id,
  selector: 'news-detail',
  templateUrl: 'news-detail.component.html',
  styleUrls: ['news-detail.component.css'],
  inputs: ['news']
})
export class NewsDetail implements OnInit {
  public news: News;

  constructor(private current: ActivatedRoute, public router : Router, private newsService: NewsService, private headerService: NewsHeaderService) {

  }

  ngOnInit() {
     this.current.params
    .switchMap((params: Params) => this.newsService.getById(params['id']))
    .subscribe(news => {this.news = news;  this.headerService.change(news.title, news.subTitle, news.imgPath)});
  }


  gotoNews() {
    this.headerService.reset();
    this.router.navigate(['/news']);
  }
}
