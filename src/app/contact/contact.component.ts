import { Component, OnInit } from '@angular/core';
import { ContactPage } from '../models/contact-page.model';
import { ContactPageService } from '../services/index';

@Component({
  moduleId: module.id,
  selector: 'contact',
  templateUrl: 'contact.component.html'
})
export class ContactComponent implements OnInit {


  contactPage: ContactPage;

  constructor(private contactPageService: ContactPageService) {}

  ngOnInit() {
    this.contactPage = this.contactPageService.getPage();


  }
}
