import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NewsService, NewsHeaderService} from '../../shared/services';
import { News } from '../../shared/models';
import 'rxjs/add/operator/switchMap';
@Component({
  moduleId: module.id,
  selector: 'app-news-detail',
  templateUrl: 'news-detail.component.html',
  styleUrls: ['news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  @Input() news: News;

  constructor(private current: ActivatedRoute, public router: Router,
    private newsService: NewsService, private headerService: NewsHeaderService) { }

  ngOnInit() {
     this.current.params
    .switchMap((params: Params) => this.newsService.getById(params['id']))
    .subscribe(news => {this.news = news;  this.headerService.change(news.title, news.subTitle, '(' + news.author + ')'); });
  }

  gotoNews() {
    this.headerService.reset();
    this.router.navigate(['/mainlayout/news/list']);
  }
}
