import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { DTCarouselComponent } from './dt-carousel/dt-carousel.component';
import { FeaturetteComponent } from './featurette/featurette.component';
import { BrancheComponent } from './branche/branche.component';

export const MODULE_ROUTES: Route[] = [
  { path: '', pathMatch: 'full' , component: HomeComponent }
];

export const MODULE_COMPONENTS = [
  HomeComponent,
  DTCarouselComponent,
  FeaturetteComponent,
  BrancheComponent
];
