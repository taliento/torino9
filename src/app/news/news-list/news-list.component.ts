import { Component, OnInit } from '@angular/core';
import { News } from '../../models/news.model';
import { NewsService} from '../../services/news.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'news-list',
  templateUrl: 'news-list.component.html',
  styleUrls: ['news-list.component.css']
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
      this.collectionSize = parseInt(res.json().count);
      if(this.collectionSize > 0) {
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
    console.log("error:"+res);
  }
}
