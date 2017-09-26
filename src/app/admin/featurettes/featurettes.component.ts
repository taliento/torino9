import { Component, OnInit } from '@angular/core';
import { Featurette } from '../../models/featurette.model';
import { FeaturetteService } from '../../services/index';

@Component({
    moduleId: module.id,
    selector: 'dt-featurettes',
    templateUrl: 'featurettes.component.html'
})

export class FeaturetteComponent implements OnInit{

  public featuretteList: Featurette[];

  constructor(private featuretteService: FeaturetteService) {

  }

  ngOnInit(): void {
    this.featuretteService.getAll().then(result => this.featuretteList = result);
  }
}
