import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { BrancaService } from '../services/branca.service';

@Component({
  moduleId: module.id,
  selector:'branca-component',
  templateUrl: 'branca.component.html',
  styleUrls: ['./branca.component.css']
})
export class BrancaComponent implements OnInit {

  branca: any;

  constructor(private current: ActivatedRoute, private router : Router, private brancaService : BrancaService) { }

  ngOnInit() {
     this.current.params
    .switchMap((params: Params) => this.brancaService.getById(params['id']))
    .subscribe(branca => this.branca = branca );
  }
}
