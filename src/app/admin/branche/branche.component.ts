import { Component, OnInit, ViewChild } from '@angular/core';
import { BrancaService, AlertService } from '../../services/index';
import { Branca } from '../../models';

const BRANCHE_COMBO = [
  {id: 'LC', title: 'Lupetti', subtitle: '(L/C) - bambini/e dai 8 ai 11/12 anni'},
  {id: 'EG', title: 'Esploratori e Guide', subtitle: '(E/G) - ragazzi/e dai 11/12 ai 16 anni'},
  {id: 'RS', title: 'Rover e Scolte', subtitle: '(R/S) - giovani dai 16 ai 20/21 anni'}
];

@Component({
    moduleId: module.id,
    selector: 'branche-component',
    templateUrl: 'branche.component.html'
})

export class BrancheComponent implements OnInit {
  brancheCombo = BRANCHE_COMBO;//XXX

  selectedBranca: any = null;

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

  onChangeBrancaCombo(branca) {
    this.newBranca._id = branca.id;
    this.newBranca.title = branca.title;
    this.newBranca.subtitle = branca.subtitle;
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
