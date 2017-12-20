import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './home.routes';
import { MapModule } from '../map/map.module';
import { BrancaDetailComponent } from './branche/branca-detail/branca-detail.component';
import { FeaturetteDetailComponent } from './featurette/featurette-detail/featurette-detail.component';

@NgModule({
  imports: [
    NgbModule,
    RouterModule.forChild(MODULE_ROUTES),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    MapModule
  ],
  declarations: [
    MODULE_COMPONENTS,
    BrancaDetailComponent,
    FeaturetteDetailComponent
  ]
})
export class HomeModule {}
