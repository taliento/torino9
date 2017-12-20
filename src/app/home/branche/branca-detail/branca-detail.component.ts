import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';
import { Branca } from '../../../shared/models';
import { fadeInAnimation } from '../../../shared/animations';

@Component({
  selector: 'app-branca-detail',
  templateUrl: './branca-detail.component.html',
  animations: [fadeInAnimation]
})
export class BrancaDetailComponent implements OnInit {

  @Input() branca: Branca;
  state = 'hide'

  constructor(public el: ElementRef) { }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
   checkScroll() {
     const componentPosition = this.el.nativeElement.offsetTop
     const scrollPosition = window.pageYOffset

     if (scrollPosition > componentPosition) {
       this.state = 'show'
     } else {
       this.state = 'hide'
     }

   }

}
