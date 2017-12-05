import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './admin.routes';
import { MapModule } from '../map/map.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
imports: [ NgbModule,
  RouterModule.forChild(MODULE_ROUTES),
  FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
  BrowserModule,
  ReactiveFormsModule,
  FormsModule,
  MapModule,
  HttpModule
  ],
  declarations: [
    MODULE_COMPONENTS
  ]
})
export class AdminModule {}
