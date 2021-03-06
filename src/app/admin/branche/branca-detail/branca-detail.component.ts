import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Branca } from '../../../shared/models';
import { BrancaService, AlertService } from '../../../shared/services';

@Component({
  moduleId: module.id,
  selector: 'app-branca-detail',
  templateUrl: 'branca-detail.component.html'
})
export class BrancaDetailComponent {
   @Input() branca: Branca;

   @Output() delete: EventEmitter<any> = new EventEmitter();
   @Output() update: EventEmitter<any> = new EventEmitter();

   @ViewChild('updateContent') updateContent;
   modalRef: NgbModalRef;

   constructor(private modalService: NgbModal, private alertService: AlertService, private brancaService: BrancaService) { }

   deleteBranca() {
     this.delete.emit(this.branca);
   }

   updateBranca($event) {
     this.update.emit($event);
   }

   closeModal() {
    if (this.modalRef) {
        this.modalRef.close();
    }
   }

   updateModal() {
     this.modalRef = this.modalService.open(this.updateContent, {size: 'lg'});
   }
}
