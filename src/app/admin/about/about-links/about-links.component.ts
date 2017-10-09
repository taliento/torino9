import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'dt-about-links',
    templateUrl: 'about-links.component.html'
})

export class AboutLinkComponent {

  @Input() links: any[];

  addLink() {
    if(!this.links) {
      this.links = [];
    }

    this.links.push({href:'',text:''});
  }

  getLinks(): any[] {
    return this.links;
  }

}
