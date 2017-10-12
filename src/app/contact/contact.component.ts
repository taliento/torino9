import { Component, OnInit } from '@angular/core';
import { ContactPage } from '../models/contact-page.model';
import { ContactPageService } from '../services/index';

@Component({
  moduleId: module.id,
  selector: 'contact',
  templateUrl: 'contact.component.html'
})
export class ContactComponent implements OnInit {

  contactPage: ContactPage = new ContactPage();

  constructor(private contactPageService: ContactPageService) {}

  ngOnInit() {
    this.contactPageService.get().then(result => {
      if(result) {
        this.contactPage = result
      }
    });
  }
}
