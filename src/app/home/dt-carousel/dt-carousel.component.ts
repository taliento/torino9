import { Component, OnInit } from '@angular/core';
import { CarouselService } from '../../services/index';
import { DTCarousel } from '../../models/dt-carousel.model';

@Component({
  moduleId: module.id,
  selector: 'dt-carousel',
  templateUrl: 'dt-carousel.component.html',
  styleUrls: [
    './dt-carousel.component.css',
    '../home.component.css'
  ]
})
export class DTCarouselComponent {
  public carouselList: DTCarousel[];

  constructor(private carouselService: CarouselService) {

  }

  ngOnInit(): void {
    this.carouselService.getAll().then(result => this.carouselList = result);
  }
}
