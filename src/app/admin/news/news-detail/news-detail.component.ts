import { Component, Input } from '@angular/core';
import { News } from '../../../models/news.model';

@Component({
  moduleId: module.id,
  selector: 'dt-news-detail',
  templateUrl: 'news-detail.component.html'
})
export class NewsDetailComponent{
   @Input() news: News;

}
