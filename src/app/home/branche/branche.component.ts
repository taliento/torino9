import { Component, OnInit } from '@angular/core';
import { Branca } from '../../models';
import { BrancaService } from '../../services/index';

@Component({
    moduleId: module.id,
    selector: 'branche',
    templateUrl: 'branche.component.html'
})

export class BrancheComponent {

  public brancheList: Branca[];

  constructor(private brancaService: BrancaService) {

  }

  ngOnInit(): void {
    this.brancaService.getAll().then(result => this.brancheList = result);
  }

}
