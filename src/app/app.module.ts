import { CommonModule } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NavbarModule } from './navbar/index';
import { FooterModule } from './footer/index';
import { HomeModule } from './home/index';
import { AdminModule } from './admin/index';
import { NewsModule } from './news/index';
import { CalendarModule } from './calendar/calendar.module';
import { AlertComponent } from './alert/index';
import { routing, MODULE_COMPONENTS } from './app.routing';
import { AuthGuard } from './shared/guards/index';
import { AlertService, AuthenticationService, UserService,
  NewsService, NewsHeaderService, CarouselService,
  FeaturetteService, CalendarService, AboutPageService,
  ContactPageService, BrancaService, DownloadService, AppConfigService, CustomPageService } from './shared/services';
import { MapModule } from './map/map.module';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { MainLayoutComponent } from './main-layout/main-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    MODULE_COMPONENTS,
    MainLayoutComponent
  ],
  imports: [
    NgbModule.forRoot(),
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    CommonModule,
    FormsModule,
    HttpModule,
    NavbarModule,
    FooterModule,
    HomeModule,
    AdminModule,
    NewsModule,
    CalendarModule,
    routing,
    BrowserModule,
    MapModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    NewsService,
    Title,
    NewsHeaderService,
    CarouselService,
    FeaturetteService,
    CalendarService,
    AboutPageService,
    ContactPageService,
    BrancaService,
    DownloadService,
    AppConfigService,
    CustomPageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
