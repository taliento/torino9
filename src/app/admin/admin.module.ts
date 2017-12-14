import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './admin.routes';
import { MapModule } from '../map/map.module';

@NgModule({
imports: [ NgbModule,
  RouterModule.forChild(MODULE_ROUTES),
  ReactiveFormsModule,
  CommonModule,
  FormsModule,
  MapModule,
  HttpModule
  ],
  declarations: [
    MODULE_COMPONENTS
  ]
})
export class AdminModule {}
