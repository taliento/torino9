import { Component, OnInit } from '@angular/core';
import { News } from '../../models/news.model';
import { NewsService, AlertService } from '../../services/index';

@Component({
    moduleId: module.id,
    selector: 'dt-news',
    templateUrl: 'news.component.html'
})

export class NewsComponent implements OnInit{
  isCollapsed = true;
  public newsList: News[];

  newNews: News = new News();//:D

  constructor(private newsService: NewsService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.loadAllNews();
  }

  addNews() {
    this.newsService.insert(this.newNews)
    .subscribe(
      data => {
        this.alertService.success(this.newNews.title+' inserita!', false);
        this.isCollapsed = true;
        this.loadAllNews();
      },
      error => {
        this.alertService.error(error._body);
      });
  }

  loadAllNews() {
    this.newsService.getAll().then(result => this.newsList = result);
  }
}
