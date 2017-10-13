import { Component, OnInit, ViewChild } from '@angular/core';
import { BrancaService, AlertService } from '../../services/index';
import { Branca } from '../../models';

@Component({
    moduleId: module.id,
    selector: 'branche-component',
    templateUrl: 'branche.component.html'
})

export class BrancheComponent implements OnInit {
  isCollapsed = true
  branche: Branca[] = [];
  idDelete: string;
  newBranca: Branca = new Branca();
  @ViewChild('confirmDialog') confirmDialog;
  confirmTitle = 'Sicuro?';
  confirmText = 'Stai elminando una branca...';

  constructor(private brancheService: BrancaService, private alertService: AlertService) { }

  ngOnInit() {
    this.loadData();
  }

  addBranca(_branca) {
    this.brancheService.insert(_branca)
    .subscribe(
      data => {
        this.alertService.success(_branca.title+' inserita!', false);
        this.newBranca = new Branca();
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
    subscribe(
      data => {
        this.alertService.success('Branca eliminata', false);
        this.loadData();
      },
      error => {
        this.alertService.error(error._body);
      });
    }

  loadData() {
    this.brancheService.getAll().then(result =>  this.branche = result );//3
  }
}
