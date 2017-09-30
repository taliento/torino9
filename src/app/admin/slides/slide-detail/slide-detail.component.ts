import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DTCarousel } from '../../../models/dt-carousel.model';
import { CarouselService, AlertService } from '../../../services/index';

@Component({
  moduleId: module.id,
  selector: 'dt-slide-detail',
  templateUrl: 'slide-detail.component.html'
})
export class SlideDetailComponent{
   @Input() slide: DTCarousel;

   @Output() delete: EventEmitter<any> = new EventEmitter();

   @ViewChild('updateContent') updateContent;

   constructor(private modalService: NgbModal, private carouselService: CarouselService,  private alertService: AlertService) {

   }

   deleteSlide() {
     this.delete.emit(this.slide);
   }

   update() {
     this.carouselService.update(this.slide).subscribe(
       data => {
         this.alertService.success(this.slide.title+' modificato con successo!', true);
       },
       error => {
         this.alertService.error(error._body);
       });
   }

   modifySlide() {
     this.modalService.open(this.updateContent);
   }

}
