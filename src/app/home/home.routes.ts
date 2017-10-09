import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutUsComponent } from '../about/index';
import { ContactComponent } from '../contact/index';
import { LoginComponent } from '../login/index';
import { DTCarouselComponent } from './dt-carousel/dt-carousel.component';
import { FeaturetteComponent } from './featurette/featurette.component';

export const MODULE_ROUTES: Route[] = [
  { path: '', pathMatch: 'full' , component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent }
]

export const MODULE_COMPONENTS = [
  HomeComponent,
  AboutUsComponent,
  ContactComponent,
  LoginComponent,
  DTCarouselComponent,
  FeaturetteComponent
]
