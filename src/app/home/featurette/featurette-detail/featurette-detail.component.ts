import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';
import { featuretteAnimation } from '../../../shared/animations';
import { Featurette } from '../../../shared/models';

@Component({
  selector: 'app-featurette-detail',
  templateUrl: './featurette-detail.component.html',
  animations: [featuretteAnimation]
})
export class FeaturetteDetailComponent implements OnInit {

  @Input() featurette: Featurette;
  @Input() featuretteIndex: number;

  state = 'hide'

  constructor(public el: ElementRef) { }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
   checkScroll() {
     const componentPosition = this.el.nativeElement.offsetTop
     const scrollPosition = window.pageYOffset + 380;

     if (scrollPosition >= componentPosition) {
       this.state = 'show'
     } else {
       this.state = 'hide'
     }

   }

   isOdd(): boolean {
      return this.featuretteIndex % 2 === 0;
   }

}
