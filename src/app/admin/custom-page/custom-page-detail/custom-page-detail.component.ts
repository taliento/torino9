import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomPage } from '../../../shared/models';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomPageService, AlertService } from '../../../shared/services';

@Component({
  moduleId: module.id,
  selector: 'app-custom-page-detail',
  templateUrl: 'custom-page-detail.component.html'
})
export class CustomPageDetailComponent implements OnInit {

  @ViewChild('insertForm') insertForm;
  page: CustomPage = null;

  constructor(
    private current: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private customPageService: CustomPageService) {}

    ngOnInit() {
      this.current.params
      .switchMap((params: Params) => {

        if (params['id'] === 'new') {
          return new Promise<CustomPage>((resolve, reject) => {
            try {
              resolve(new CustomPage());
            } catch (error) {
              reject(error);
            }
          });
        }

        return this.customPageService.getById(params['id']);

      } )
      .subscribe(page => this.page = page);
    }

    formSubmit($event) {
      this.customPageService.insert($event)
      .subscribe(
        data => {
          this.page = data;
          this.alertService.success('Inserito!', false);
          this.insertForm.setLoading(false);
        },
        error => {
          this.alertService.error(error._body);
        });
      }
}
