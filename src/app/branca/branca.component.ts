import { Component, OnInit } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { BrancaService } from '../shared/services';
import { Branca } from '../shared/models/';

@Component({
  moduleId: module.id,
  selector: 'app-branca',
  templateUrl: 'branca.component.html',
  styleUrls: ['./branca.component.scss']
})
export class BrancaComponent implements OnInit {

  backgroundImg: any;
  branca: Branca = new Branca();

  constructor(private current: ActivatedRoute, private router: Router,
    private brancaService: BrancaService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
     this.current.params
    .switchMap((params: Params) => this.brancaService.getById(params['id']))
    .subscribe(
      branca => {
        this.branca = branca;
        if (this.branca.imgPath) {
          this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle('url(' + this.branca.imgPath + ')');
        }
      },
      error => {
        this.router.navigate(['']);
      });
  }
}
