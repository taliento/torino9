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
import { AuthGuard } from './guards/index';
import { AlertService, AuthenticationService, UserService,
  NewsService, NewsHeaderService, CarouselService,
  FeaturetteService, CalendarService, AboutPageService,
  ContactPageService, BrancaService, DownloadService, AppConfigService } from './services/index';
import { MapModule } from './map/map.module';
import { BrancaModule } from './branca/branca.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    MODULE_COMPONENTS
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
    BrancaModule,
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
    AppConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
