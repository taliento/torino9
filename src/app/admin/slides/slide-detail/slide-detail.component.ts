import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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
   @Output() updated: EventEmitter<any> = new EventEmitter();
   @ViewChild('updateContent') updateContent;//MODAL VIEW
   modalRef: NgbModalRef;

   constructor(private modalService: NgbModal, private carouselService: CarouselService,  private alertService: AlertService) { }

   deleteSlide() {
     this.delete.emit(this.slide);
   }

   update($event) {
     $event.append('_id', this.slide._id);
     $event.append('imgPath', this.slide.imgPath);
     this.carouselService.updateUpload($event).subscribe(
       data => {
         this.alertService.success($event.title+' modificato con successo!', false);
         this.modalRef.close();
         this.updated.emit();
       },
       error => {
         this.alertService.error(error._body);
       });
   }

   modifySlide() {
     this.modalRef = this.modalService.open(this.updateContent);
   }

}
