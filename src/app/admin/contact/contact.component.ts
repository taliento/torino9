import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactPage } from '../../models/contact-page.model';
import { ContactPageService, AlertService } from '../../services/index';

@Component({
    moduleId: module.id,
    selector: 'dt-contact',
    templateUrl: './contact.component.html'
})

export class ContactComponent implements OnInit {

  contactPage: ContactPage = new ContactPage();
  @ViewChild('contactList') contactList;

  constructor(private contactPageService: ContactPageService, private alertService: AlertService) {}

  ngOnInit() {
    this.contactPageService.get().then(result => this.contactPage = result);
  }

  mapCenter($event) {
    this.contactPage.mapLat = $event.lat;
    this.contactPage.mapLng = $event.lng;
  }

  save() {
    this.contactPage.contacts = this.contactList.getContacts();

    if(this.contactPage._id) {
      this.contactPageService.update(this.contactPage)
      .subscribe(
        data => {
          this.alertService.success('Pagina modificata', false);
        },
        error => {
          this.alertService.error(error._body);
        });
    } else {
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
}
