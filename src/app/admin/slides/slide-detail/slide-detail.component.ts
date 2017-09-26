import { Component, Input } from '@angular/core';
import { DTCarousel } from '../../../models/dt-carousel.model';

@Component({
  moduleId: module.id,
  selector: 'dt-slide-detail',
  templateUrl: 'slide-detail.component.html'
})
export class SlideDetailComponent{
   @Input() slide: DTCarousel;

}
