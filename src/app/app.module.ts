import { CommonModule } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { LOCALE_ID } from '@angular/core';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { registerLocaleData } from '@angular/common';
import localeIT from '@angular/common/locales/it';

registerLocaleData(localeIT);

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    MODULE_COMPONENTS,
    MainLayoutComponent
  ],
  imports: [
    routing,
    NgbModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NavbarModule,
    FooterModule,
    HomeModule,
    AdminModule,
    NewsModule,
    CalendarModule,
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
    CustomPageService,
     { provide: LOCALE_ID, useValue: "it" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
