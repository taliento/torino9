import { Component } from '@angular/core';
import { routerTransition } from '../shared/animations';
import { LoadingService } from '../shared/services';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations:[routerTransition]
})
export class MainLayoutComponent {

  loading: any;

  constructor(private loadingService: LoadingService) {
    this.loadingService.loading.subscribe((loading) => this.loading = loading );
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
