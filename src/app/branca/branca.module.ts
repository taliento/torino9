import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { MODULE_COMPONENTS, MODULE_ROUTES } from './branca.routes';

@NgModule({
  imports: [ CommonModule, NgbModule, RouterModule.forChild(MODULE_ROUTES) ],
  declarations: [ MODULE_COMPONENTS ]
})
export class BrancaModule {}
