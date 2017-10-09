import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
    apiKey: 'AIzaSyASuaWBN3f_K6IC9CA3qlUOS1Otm8BYMNs',
    libraries: ["places"],
    language:'it-IT' //set whatever langs u want
    })
  ],
  declarations: [ MapComponent ],
  exports: [ MapComponent ]
})
export class MapModule {}
