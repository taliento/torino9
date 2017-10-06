class AboutLink {
  href: string;
  text: string;
}

export class AboutPage {
  title: string;
  subtitle:string;
  text: string;
  mapTitle: string;
  mapLat: number;
  mapLng: number;
  links: AboutLink[];
}
