import { CommonModule } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
ContactPageService, BrancaService, DownloadService, AppConfigService,
CustomPageService, CustomDatepickerI18n, PolicyService,
AuthenticationInterceptorService } from './shared/services';
import { MapModule } from './map/map.module';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeIT from '@angular/common/locales/it';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import { CookieLawModule } from 'angular2-cookie-law';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localeIT);

@NgModule({
declarations: [
  AppComponent,
  AlertComponent,
  MODULE_COMPONENTS,
],
imports: [
  routing,
  NgbModule.forRoot(),
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  NavbarModule,
  FooterModule,
  HomeModule,
  AdminModule,
  NewsModule,
  CalendarModule,
  BrowserModule,
  MapModule,
  CookieLawModule,
  BrowserAnimationsModule
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
  PolicyService,
  { provide: LOCALE_ID,
    useValue: 'it'
  },
  {
    provide: NgbDatepickerI18n,
    useClass: CustomDatepickerI18n},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
