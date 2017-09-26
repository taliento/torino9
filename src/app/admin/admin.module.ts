import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './admin.routes';

@NgModule({
imports: [ NgbModule,
  RouterModule.forChild(MODULE_ROUTES),
  CommonModule,
  FormsModule,
  HttpModule
  ],
  declarations: [
    MODULE_COMPONENTS
  ]
})
export class AdminModule {}
