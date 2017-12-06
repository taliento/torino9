import { Route } from '@angular/router';
import { NewsComponent } from './news.component';

import { NewsDetailComponent } from './news-detail/index';
import { NewsListComponent } from './news-list/index';

export const MODULE_ROUTES: Route[] = [
  { path: 'list', pathMatch: 'full', component: NewsListComponent },
  { path: 'detail/:id', component: NewsDetailComponent }
];

export const MODULE_COMPONENTS = [
  NewsComponent, NewsListComponent, NewsDetailComponent
];
