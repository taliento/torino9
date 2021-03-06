import { Component, OnInit, ViewChild } from '@angular/core';
import { BrancaService, AlertService } from '../../shared/services';
import { Branca } from '../../shared/models';


@Component({
    moduleId: module.id,
    selector: 'app-branche',
    templateUrl: 'branche.component.html'
})

export class BrancheComponent implements OnInit {

  @ViewChild('insertForm') insertForm;
  @ViewChild('confirmDialog') confirmDialog;
  @ViewChild('brancaDetail') brancaDetail;

  isCollapsed = true;
  branche: Branca[] = [];
  idDelete: string;

  confirmTitle = 'Sicuro?';
  confirmText = 'Stai elminando una branca...';

  constructor(private brancheService: BrancaService, private alertService: AlertService) { }

  ngOnInit() {
    this.loadData();
  }

  addBranca($event) {
    this.brancheService.insertUpload($event)
    .subscribe(
      data => {
        this.alertService.success('Inserito!', false);
        this.insertForm.setLoading(false);
        this.brancaDetail.closeModal();
        this.isCollapsed = true;
        this.loadData();
      },
      error => {
        this.alertService.error(error._body);
      });
  }

  delete(branca) {
    this.idDelete = branca._id;
    this.confirmDialog.open();
  }

  deleteBranca() {
    this.brancheService.delete(this.idDelete).
    subscribe(res => {
        this.alertService.success('Branca eliminata', false);
        this.loadData();
      },
      error => {
        this.alertService.error(error._body);
      });
    }

  loadData() {
    this.brancheService.getAll().then(result =>  this.branche = result ); // 3
  }
}
