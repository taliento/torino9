import { Contact } from './contact.model';

export class ContactPage {
  _id:string;
  title: string;
  text: string;
  contacts: Contact[];
  mapTitle: string;
  mapLat: number;
  mapLng: number;
}
