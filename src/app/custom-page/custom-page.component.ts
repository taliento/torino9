import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomPage } from '../shared/models';
import { CustomPageService } from '../shared/services';

@Component({
  moduleId: module.id,
  selector: 'app-custom-page',
  templateUrl: 'custom-page.component.html',
  styleUrls: ['./custom-page.component.scss']
})
export class CustomPageComponent implements OnInit {

  page: CustomPage = new CustomPage();

  constructor(
    private current: ActivatedRoute,
    private router: Router,
    private customPageService: CustomPageService) {}

  ngOnInit() {
    this.current.params
   .switchMap((params: Params) => this.customPageService.getById(params['id']))
   .subscribe(
     page => {
       this.page = page;
     },
     error => {
       console.log(error);
      //  this.router.navigate(['mainlayout/home']);
     });
  }
}
