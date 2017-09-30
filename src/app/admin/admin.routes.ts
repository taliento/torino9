import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SlidesComponent } from './slides/slides.component';
import { UsersComponent } from './users/users.component';
import { FeaturetteComponent } from './featurettes/featurettes.component';
import { SlideDetailComponent } from './slides/slide-detail/slide-detail.component';
import { FeaturetteDetailComponent } from './featurettes/featurette-detail/featurette-detail.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog.component';
import { NewsComponent} from './news/news.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';

export const MODULE_ROUTES: Route[] = [
  { path: '', pathMatch: 'full' , component: AdminComponent }
]

export const MODULE_COMPONENTS = [
  AdminComponent,
  SlidesComponent,
  UsersComponent,
  FeaturetteComponent,
  SlideDetailComponent,
  FeaturetteDetailComponent,
  UserDetailComponent,
  ConfirmDialog,
  NewsComponent,
  NewsDetailComponent
]
