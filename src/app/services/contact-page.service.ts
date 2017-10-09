import { Injectable } from '@angular/core';
import { ContactPage } from '../models/contact-page.model';

@Injectable()
export class ContactPageService{

  getPage() {

    let contactPage = new ContactPage()
    contactPage.title = "Siamo il gruppo scout di torino";
    contactPage.text = "fondato nel ecc.. ecc...";

    let contacts = [];

    contacts.push({name:'test',email:'test@me.it',tel:'011458127', mobile:'333458127'});
    contacts.push({name:'test2',email:'test2@me.it',tel:'0114528',mobile:'3334528'});
    contacts.push({name:'test3',email:'test3@me.it',tel:'0114528',mobile:'3334528'});
    // contacts.push({name:'test4',email:'test4@me.it',tel:'0114528',mobile:'3334528'});

    contactPage.mapTitle = 'Siamo qui!';
    contactPage.mapLat = 45.1033206;
    contactPage.mapLng  = 7.696940899999959;

    contactPage.contacts = contacts;

    return contactPage;
  }

}
