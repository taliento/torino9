import { Component, OnInit } from '@angular/core';
import { ContactPage } from '../shared/models';
import { ContactPageService } from '../shared/services';

@Component({
  moduleId: module.id,
  selector: 'app-contact',
  templateUrl: 'contact.component.html'
})
export class ContactComponent implements OnInit {

  contactPage: ContactPage = new ContactPage();

  constructor(private contactPageService: ContactPageService) {}

  ngOnInit() {
    this.contactPageService.get().then(result => {
      if (result) {
        this.contactPage = result;
      }
    });
  }
}
