import { Component, OnInit } from '@angular/core';
import { Featurette } from '../../shared/models';
import { FeaturetteService } from '../../shared/services';

@Component({
    moduleId: module.id,
    selector: 'app-featurette',
    templateUrl: 'featurette.component.html'
})

export class FeaturetteComponent implements OnInit {

  public featuretteList: Featurette[];

  constructor(private featuretteService: FeaturetteService) { }

  ngOnInit(): void {
    this.featuretteService.getAll().then(result => this.featuretteList = result);
  }

}
