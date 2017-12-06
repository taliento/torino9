import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SlidesComponent } from './slides/slides.component';
import { UsersComponent } from './users/users.component';
import { FeaturetteComponent } from './featurettes/featurettes.component';
import { SlideDetailComponent } from './slides/slide-detail/slide-detail.component';
import { FeaturetteDetailComponent } from './featurettes/featurette-detail/featurette-detail.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { NewsComponent} from './news/news.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { EventsComponent } from './events/events.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AboutLinkComponent } from './about/about-links/about-links.component';
import { LinkDetailComponent } from './about/about-links/link-detail/link-detail.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactMapComponent } from './contact/contact-map/contact-map.component';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { BrancheComponent } from './branche/branche.component';
import { BrancaDetailComponent } from './branche/branca-detail/branca-detail.component';
import { SlideUploadComponent} from './slides/slide-upload/slide-upload.component';
import { BrancaUploadComponent } from './branche/branca-upload/branca-upload.component';
import { FeaturetteUploadComponent } from './featurettes/featurette-upload/featurette-upload.component';
import { UserUploadComponent } from './users/user-upload/user-upload.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { ImagesUploadComponent } from './downloads/upload-images/upload-images.component';
import { AppConfigComponent } from './config/app-config.component';
import { CustomPageDetailComponent } from './custom-page/custom-page-detail/custom-page-detail.component';
import { CustomPageComponent } from './custom-page/custom-page.component';
import { AdminTabsComponent} from './admin-tabs/admin-tabs.component';
import { CustomPageFormComponent } from './custom-page/custom-page-form/custom-page-form.component';
import {AuthGuard} from '../shared/guards';

export const MODULE_ROUTES: Route[] = [
  {
    path: 'tabs',  component: AdminTabsComponent,
  },
  {
    path: 'page/:id', component: CustomPageDetailComponent
  }
];

export const MODULE_COMPONENTS = [
  AdminComponent,
  SlidesComponent,
  UsersComponent,
  FeaturetteComponent,
  SlideDetailComponent,
  FeaturetteDetailComponent,
  UserDetailComponent,
  ConfirmDialogComponent,
  NewsComponent,
  NewsDetailComponent,
  EventsComponent,
  EventDetailComponent,
  AboutComponent,
  ContactComponent,
  AboutLinkComponent,
  LinkDetailComponent,
  ContactListComponent,
  ContactMapComponent,
  ContactDetailComponent,
  BrancheComponent,
  BrancaDetailComponent,
  SlideUploadComponent,
  BrancaUploadComponent,
  FeaturetteUploadComponent,
  UserUploadComponent,
  DownloadsComponent,
  ImagesUploadComponent,
  AppConfigComponent,
  CustomPageComponent,
  CustomPageDetailComponent,
  AdminTabsComponent,
  CustomPageFormComponent
];
