import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-link-detail',
    templateUrl: 'link-detail.component.html'
})

export class LinkDetailComponent {

  @Input() link: any;

}
