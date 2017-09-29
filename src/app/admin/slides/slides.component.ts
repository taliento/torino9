import { Component, OnInit } from '@angular/core';
import { DTCarousel } from '../../models/dt-carousel.model';
import { CarouselService, AlertService } from '../../services/index';

@Component({
  moduleId: module.id,
  selector: 'dt-slides',
  templateUrl: 'slides.component.html'
})
export class SlidesComponent implements OnInit{
  public slides: DTCarousel[];
  newSlide: DTCarousel = new DTCarousel();
  isCollapsed = true;
  
  constructor(private carouselService: CarouselService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.loadAllSlides();
  }

  addSlide() {
    this.carouselService.insert(this.newSlide)
    .subscribe(
      data => {
        this.alertService.success(this.newSlide.title+' inserita!', true);
        this.loadAllSlides();
      },
      error => {
        this.alertService.error(error._body);
      });
  }

  loadAllSlides() {
    this.carouselService.getAll().then(result => this.slides = result);
  }
}
