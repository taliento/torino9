import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'contact',
  templateUrl: 'contact.component.html',
  styleUrls: [ '../home.component.css']
})
export class ContactComponent implements OnInit {
  contacts: any[] = [];

  ngOnInit() {
    this.contacts.push({name:'test',email:'test@me.it',tel:'011458127', mobile:'333458127'});
    this.contacts.push({name:'test2',email:'test2@me.it',tel:'0114528',mobile:'3334528'});
    this.contacts.push({name:'test3',email:'test3@me.it',tel:'0114528',mobile:'3334528'});
    this.contacts.push({name:'test4',email:'test4@me.it',tel:'0114528',mobile:'3334528'});
  }
}
