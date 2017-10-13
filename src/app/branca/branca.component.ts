import { Component, OnInit } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { BrancaService } from '../services/branca.service';
import { Branca } from '../models/';

@Component({
  moduleId: module.id,
  selector:'branca-component',
  templateUrl: 'branca.component.html',
  styleUrls: ['./branca.component.css']
})
export class BrancaComponent implements OnInit {

  backgroundImg: any;
  branca: Branca = new Branca();

  constructor(private current: ActivatedRoute, private router : Router, private brancaService : BrancaService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
     this.current.params
    .switchMap((params: Params) => this.brancaService.getById(params['id']))
    .subscribe(branca => {
      this.branca = branca;
      if(this.branca.imgPath) {
        this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle('url('+this.branca.imgPath+')'); 
      }
    } );
  }
}
