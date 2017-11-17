import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactPage } from '../../models/contact-page.model';
import { ContactPageService, AlertService } from '../../services/index';
import { ContactListComponent } from './contact-list/contact-list.component';

@Component({
    moduleId: module.id,
    selector: 'app-contact',
    templateUrl: './contact.component.html'
})

export class ContactComponent implements OnInit {

  contactPage: ContactPage = new ContactPage();
  @ViewChild('contactList') contactList: ContactListComponent;

  constructor(private contactPageService: ContactPageService, private alertService: AlertService) {}

  ngOnInit() {
    this.contactPageService.get().then(result => {
      if (result) {
          this.contactPage = result;
      }
    });
  }

  mapCenter($event) {
    this.contactPage.mapLat = $event.lat;
    this.contactPage.mapLng = $event.lng;
    this.contactPage.mapTitle = 'Ci trovi qui! ' + $event.title;
  }

  save() {
    this.contactPage.contacts = this.contactList.getContacts();
    this.contactPageService.insert(this.contactPage)
    .subscribe(
      data => {
        this.alertService.success('Pagina inserita', false);
      },
      error => {
        this.alertService.error(error._body);
      });
  }
}
