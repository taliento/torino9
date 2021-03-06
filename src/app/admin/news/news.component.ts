import { Component, OnInit, ViewChild } from '@angular/core';
import { News } from '../../shared/models';
import { NewsService, AlertService, AuthenticationService } from '../../shared/services';

@Component({
    moduleId: module.id,
    selector: 'app-news',
    templateUrl: 'news.component.html'
})

export class NewsComponent implements OnInit {
  isCollapsed = true;
  public newsList: News[];

  newNews: News = new News(null, null, null); // :D

  @ViewChild('confirmDialog') confirmDialog;
  confirmTitle = 'Sicuro?';
  confirmText = 'Stai elminando una news...';
  idDelete: string;

  page = 1;
  pageSize = 3;
  collectionSize = 0;
  previousPage: any;

  constructor(
    private newsService: NewsService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.newsService.count('all').subscribe((res) => {
      this.collectionSize = res;
      if (this.collectionSize > 0) {
          this.loadData();
      }
    });
  }

  addNews() {
    this.newNews.author = this.authenticationService.getUser().username;
    this.newsService.insert(this.newNews)
    .subscribe(
      data => {
        this.alertService.success(this.newNews.title + ' inserita!', false);
        this.collectionSize++;
        this.newNews = new News(null, null, null); // :D
        this.isCollapsed = true;
        this.loadData();
      },
      error => {
        this.alertService.error(error._body);
      });
  }

  delete(news) {
    this.idDelete = news._id;
    this.confirmDialog.open();
  }

  deleteNews() {
    this.newsService.delete(this.idDelete).
    subscribe(
      data => {
        this.alertService.success('Featurette eliminata', false);
        this.collectionSize--;
        this.loadData();
      },
      error => {
        this.alertService.error(error._body);
      });
    }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData();
    }
  }

  loadData() {
    this.newsService.getPaged({
      limit: this.pageSize,
      page: this.page - 1,
      size: this.pageSize,
      date: 'all'
    }).subscribe(
      res  => this.newsList = res,
      (res: Response) => this.onError(res.json())
    );
  }

  onError (res) {
    console.log('error:' + res);
  }
}
