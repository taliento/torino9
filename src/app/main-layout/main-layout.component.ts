import { Component } from '@angular/core';
import { routerTransition } from '../shared/animations';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations:[routerTransition]
})
export class MainLayoutComponent {
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
