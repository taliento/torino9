import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './home.routes';
import { AgmCoreModule } from '@agm/core';
import { DTCarouselComponent } from './dt-carousel/dt-carousel.component';
import { FeaturetteComponent } from './featurette/featurette.component';

@NgModule({
imports: [ NgbModule,
  RouterModule.forChild(MODULE_ROUTES),
  CommonModule,
  FormsModule,
  HttpModule,
  AgmCoreModule.forRoot({
       apiKey: 'AIzaSyASuaWBN3f_K6IC9CA3qlUOS1Otm8BYMNs'
     })
  ],
  declarations: [
    MODULE_COMPONENTS,
    DTCarouselComponent,
    FeaturetteComponent
  ]
})
export class HomeModule {}
