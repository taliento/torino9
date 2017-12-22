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
  archives: Array<any> = [];
  date: Date = null;
  selectedDate = null;

  constructor(private newsService: NewsService, private router: Router) {
  }

  ngOnInit(): void {
    this.date = new Date();
    this.date.setDate(1);
    this.date.setHours(12, 0);
    this.loadAll();
    this.loadArchive();
  }

  loadAll() {
    this.newsService.count(this.date).subscribe((res) => {
      this.collectionSize = res;
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
      date: this.date
    }).subscribe(
      res  => this.newsList = res,
      (res: Response) => this.onError(res.json())
    );
  }

  loadArchive() {
    this.newsService.getArchivesDate().then(
      res => this.archives = res,
      err => this.onError(err)
    );
  }

  loadArchivePosts(date) {
    this.selectedDate = date;
    this.date = new Date(date.year + '-' + date.month + '-01T00:00:00');
    this.loadAll();
  }

  onError (res) {
    console.log('error:' + res);
  }
}
