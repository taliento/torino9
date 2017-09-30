import { Component, OnInit } from '@angular/core';
import { Featurette } from '../../models/featurette.model';
import { FeaturetteService, AlertService } from '../../services/index';

@Component({
    moduleId: module.id,
    selector: 'dt-featurettes',
    templateUrl: 'featurettes.component.html'
})

export class FeaturetteComponent implements OnInit{
  isCollapsed = true;
  public featuretteList: Featurette[];

  newFeaturette: Featurette = new Featurette();



  constructor(private featuretteService: FeaturetteService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.loadAllFeaturettes();
  }

  addFeaturette() {
    this.featuretteService.insert(this.newFeaturette)
    .subscribe(
      data => {
        this.alertService.success(this.newFeaturette.title+' inserita!', false);
        this.isCollapsed = true;
        this.loadAllFeaturettes();
      },
      error => {
        this.alertService.error(error._body);
      });
  }

  loadAllFeaturettes() {
    this.featuretteService.getAll().then(result => this.featuretteList = result);
  }
}
