import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Featurette } from '../../../models/featurette.model';
import { FeaturetteService, AlertService } from '../../../services/index';

@Component({
  moduleId: module.id,
  selector: 'app-featurette-detail',
  templateUrl: 'featurette-detail.component.html'
})
export class FeaturetteDetailComponent {
   @Input() featurette: Featurette;
   @Output() delete: EventEmitter<any> = new EventEmitter();
   @Output() updated: EventEmitter<any> = new EventEmitter();
   @ViewChild('updateContent') updateContent;
   modalRef: NgbModalRef;

   constructor(private modalService: NgbModal, private featuretteService: FeaturetteService,  private alertService: AlertService) { }

   deleteFeaturette() {
     this.delete.emit(this.featurette);
   }

   update($event) {
     $event.append('_id', this.featurette._id);
     $event.append('imgPath', this.featurette.imgPath);
     this.featuretteService.updateUpload($event).subscribe(
       data => {
         this.alertService.success($event.title + ' modificato con successo!', false);
         this.modalRef.close();
         this.updated.emit();
       },
       error => {
         this.alertService.error(error._body);
       });
   }

   modifyFeaturette() {
     this.modalRef = this.modalService.open(this.updateContent);
   }

}
