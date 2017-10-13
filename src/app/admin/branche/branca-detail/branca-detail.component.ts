import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Branca } from '../../../models';
import { BrancaService, AlertService } from '../../../services/index';

@Component({
  moduleId: module.id,
  selector: 'branca-detail',
  templateUrl: 'branca-detail.component.html'
})
export class BrancaDetailComponent {
   @Input() branca: Branca;

   @Output() delete: EventEmitter<any> = new EventEmitter();
   @Output() update: EventEmitter<any> = new EventEmitter();

   @ViewChild('updateContent') updateContent;

   constructor(private modalService: NgbModal, private alertService: AlertService, private brancaService: BrancaService) {

   }

   deleteBranca() {
     this.delete.emit(this.branca);
   }

   updateBranca() {
     this.update.emit(this.branca);
   }

   updateModal() {
     this.modalService.open(this.updateContent);
   }
}
