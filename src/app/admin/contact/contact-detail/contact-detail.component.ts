import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'contact-detail',
    templateUrl: './contact-detail.component.html'
})

export class ContactDetailComponent {
  @Input() contact: any;
  @Output() deleteContact: EventEmitter<any> = new EventEmitter();

  delete() {
    this.deleteContact.emit(this.contact);
  }
}
