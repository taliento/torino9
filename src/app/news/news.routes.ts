import { Route } from '@angular/router';
import { NewsComponent } from './news.component';

import { NewsDetail } from './news-detail/index';
import { NewsListComponent } from './news-list/index';

const CHILD_ROUTES: Route[] = [
  { path: '', pathMatch: 'full', component: NewsListComponent },
  { path: 'detail/:id', component: NewsDetail }
];

export const MODULE_ROUTES: Route[] = [
  { path: 'news', component: NewsComponent, children: [ ...CHILD_ROUTES ] }
]

export const MODULE_COMPONENTS = [
  NewsComponent, NewsListComponent, NewsDetail
]
