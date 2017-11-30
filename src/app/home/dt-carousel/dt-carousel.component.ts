import { Component, OnInit } from '@angular/core';
import { CarouselService } from '../../shared/services';
import { DTCarousel } from '../../shared/models';

@Component({
  moduleId: module.id,
  selector: 'app-carousel',
  templateUrl: 'dt-carousel.component.html'
})
export class DTCarouselComponent implements OnInit {
  public carouselList: DTCarousel[];

  constructor(private carouselService: CarouselService) { }

  ngOnInit(): void {
    this.carouselService.getAll().then(result => this.carouselList = result);
  }
}
