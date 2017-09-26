import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SlidesComponent } from './slides/slides.component';
import { UsersComponent } from './users/users.component';
import { FeaturetteComponent } from './featurettes/featurettes.component';


export const MODULE_ROUTES: Route[] = [
  { path: '', pathMatch: 'full' , component: AdminComponent }
]

export const MODULE_COMPONENTS = [
  AdminComponent,
  SlidesComponent,
  UsersComponent,
  FeaturetteComponent
]
