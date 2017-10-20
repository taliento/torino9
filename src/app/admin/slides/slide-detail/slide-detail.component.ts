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

   @ViewChild('updateContent') updateContent;//MODAL VIEW
   @ViewChild('updateForm') updateForm;

   constructor(private modalService: NgbModal, private carouselService: CarouselService,  private alertService: AlertService) {

   }

   deleteSlide() {
     this.delete.emit(this.slide);
   }

   update($event) {
     $event._id = this.slide._id;//XXX
     this.carouselService.update($event).subscribe(
       data => {
         this.alertService.success($event.title+' modificato con successo!', false);
         this.updateContent.c();
       },
       error => {
         this.alertService.error(error._body);
       });
   }

   modifySlide() {
     this.modalService.open(this.updateContent);
   }

}
