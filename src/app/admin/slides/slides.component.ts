import { Component, OnInit } from '@angular/core';
import { DTCarousel } from '../../models/dt-carousel.model';
import { CarouselService } from '../../services/index';

@Component({
  moduleId: module.id,
  selector: 'dt-slides',
  templateUrl: 'slides.component.html'
})
export class SlidesComponent implements OnInit{
  public slides: DTCarousel[];

  constructor(private carouselService: CarouselService) {

  }

  ngOnInit(): void {
    this.carouselService.getAll().then(result => this.slides = result);
  }
}
