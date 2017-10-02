import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Featurette } from '../../../models/featurette.model';
import { FeaturetteService, AlertService } from '../../../services/index';

@Component({
  moduleId: module.id,
  selector: 'dt-featurette-detail',
  templateUrl: 'featurette-detail.component.html'
})
export class FeaturetteDetailComponent{
   @Input() featurette: Featurette;

   @Output() delete: EventEmitter<any> = new EventEmitter();

   @ViewChild('updateContent') updateContent;

   constructor(private modalService: NgbModal, private featuretteService: FeaturetteService,  private alertService: AlertService) {

   }

   deleteFeaturette() {
     this.delete.emit(this.featurette);
   }

   update() {
     this.featuretteService.update(this.featurette).subscribe(
       data => {
         this.alertService.success(this.featurette.title+' modificato con successo!', false);
       },
       error => {
         this.alertService.error(error._body);
       });
   }

   modifyFeaturette() {
     this.modalService.open(this.updateContent);
   }

}
