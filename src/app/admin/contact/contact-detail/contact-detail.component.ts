import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'contact-detail',
    templateUrl: './contact-detail.component.html'
})

export class ContactDetailComponent {
  @Input() contact: any;

}
