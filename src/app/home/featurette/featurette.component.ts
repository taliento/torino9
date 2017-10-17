import { Component, OnInit } from '@angular/core';
import { Featurette } from '../../models/featurette.model';
import { FeaturetteService } from '../../services/index';

@Component({
    moduleId: module.id,
    selector: 'featurette',
    templateUrl: 'featurette.component.html'
})

export class FeaturetteComponent {

  public featuretteList: Featurette[];

  constructor(private featuretteService: FeaturetteService) {

  }

  ngOnInit(): void {
    this.featuretteService.getAll().then(result => this.featuretteList = result);
  }

  isOdd(n: number): boolean {
     return n % 2 == 0;
  }
}
