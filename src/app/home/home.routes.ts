import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutUsComponent } from '../about/index';
import { ContactComponent } from '../contact/index';
import { LoginComponent } from '../login/index';
// import { RegisterComponent } from '../register/index';
import { MapComponent } from '../map/map.component';

export const MODULE_ROUTES: Route[] = [
  { path: '', pathMatch: 'full' , component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent }
  // ,
  // { path: 'register', component: RegisterComponent }
]

export const MODULE_COMPONENTS = [
  HomeComponent,
  AboutUsComponent,
  MapComponent,
  ContactComponent,
  LoginComponent
  // ,
  // RegisterComponent
]
