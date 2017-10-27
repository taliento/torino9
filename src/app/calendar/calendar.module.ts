import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';

import { MODULE_COMPONENTS, MODULE_ROUTES } from './calendar.routes';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    RouterModule.forChild(MODULE_ROUTES)
  ],
  declarations: [ MODULE_COMPONENTS ]
})
export class CalendarModule {}
