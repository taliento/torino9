import { Component, OnInit } from '@angular/core';
import { Featurette } from '../../models/featurette.model';
import { FeaturetteService } from '../../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'featurette.component.html',
    styleUrls: ['../home.component.css']
})

export class FeaturetteComponent {

  public featuretteList: Featurette[];

  constructor(private featuretteService: FeaturetteService) {

  }

  ngOnInit(): void {
    this.featuretteService.getAll().then(result => this.featuretteList = result);
  }
}
