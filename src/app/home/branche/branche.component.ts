import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Branca } from '../../shared/models';
import { BrancaService } from '../../shared/services';

@Component({
    moduleId: module.id,
    selector: 'app-branche',
    templateUrl: 'branche.component.html'
})

export class BrancheComponent implements OnInit {

  public brancheList: Branca[];

  constructor(private brancaService: BrancaService) { }

  ngOnInit(): void {
    this.brancaService.getAll().then(result => this.brancheList = result);
  }

}
