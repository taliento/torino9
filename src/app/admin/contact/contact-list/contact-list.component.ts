import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'contact-list',
    templateUrl: './contact-list.component.html'
})

export class ContactListComponent {
  @Input() contacts: any[];

  addContact() {
    if(!this.contacts) {
      this.contacts = [];
    }
    this.contacts.push({name:'',email:'',tel:'',mobile:''})
  }

  getContacts () {
    return this.contacts;
  }

  deleteContact($event) {
    let index = this.contacts.indexOf($event);
    this.contacts.splice(index,1);
  }

}
