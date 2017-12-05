import { Component, OnInit } from '@angular/core';
import { News } from '../../shared/models';
import { NewsService} from '../../shared/services';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-news-list',
  templateUrl: 'news-list.component.html',
  styleUrls: ['news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  public newsList: News[];
  public selectedNews: News = undefined;

  page = 1;
  pageSize = 2;
  collectionSize = 0;
  previousPage: any;

  constructor(private newsService: NewsService, private router: Router) {
  }

  ngOnInit(): void {
    this.newsService.count().subscribe((res) => {
      this.collectionSize = parseInt(res.json().count, 10);
      if (this.collectionSize > 0) {
          this.loadData();
      }
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
    }).subscribe(
      res  => this.onSuccess(res.json()),
      (res: Response) => this.onError(res.json())
    );
  }

  onSuccess (res) {
    this.newsList = res;
  }

  onError (res) {
    console.log('error:' + res);
  }
}
