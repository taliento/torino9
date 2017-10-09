class AboutLink {
  href: string;
  text: string;
}

export class AboutPage {
  _id: string;
  title: string;
  subtitle:string;
  text: string;
  links: AboutLink[];
}
