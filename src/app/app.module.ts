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
import { AlertComponent } from './directives/index';
import { routing } from './app.routing';
import { AuthGuard } from './guards/index';
import { AlertService, AuthenticationService, UserService, NewsService, NewsHeaderService, CarouselService, FeaturetteService } from './services/index';



@NgModule({
  declarations: [
    AppComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NavbarModule,
    FooterModule,
    HomeModule,
    AdminModule,
    NewsModule,
    routing,
    BrowserModule,
    NgbModule.forRoot()
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
    FeaturetteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
