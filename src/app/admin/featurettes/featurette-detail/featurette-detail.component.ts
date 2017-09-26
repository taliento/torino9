import { Component, Input } from '@angular/core';
import { Featurette } from '../../../models/featurette.model';

@Component({
  moduleId: module.id,
  selector: 'dt-featurette-detail',
  templateUrl: 'featurette-detail.component.html'
})
export class FeaturetteDetailComponent{
   @Input() featurette: Featurette;

}
