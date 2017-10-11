import { Component, OnInit, ViewChild } from '@angular/core';
import { Featurette } from '../../models/featurette.model';
import { FeaturetteService, AlertService } from '../../services/index';

@Component({
    moduleId: module.id,
    selector: 'dt-featurettes',
    templateUrl: 'featurettes.component.html'
})

export class FeaturetteComponent implements OnInit{
  isCollapsed = true;
  public featuretteList: Featurette[];

  newFeaturette: Featurette = new Featurette(null,null,null);

  @ViewChild('confirmDialog') confirmDialog;
  confirmTitle = 'Sicuro?';
  confirmText = 'Stai elminando una featurette...';
  idDelete: string;

  page = 1;
  pageSize = 3;
  collectionSize = 0;
  previousPage: any;

  constructor(private featuretteService: FeaturetteService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.featuretteService.count().subscribe((res) => {
      this.collectionSize = parseInt(res.json().count);
      if(this.collectionSize > 0) {
          this.loadData();
      }
    });
  }

  addFeaturette() {
    this.featuretteService.insert(this.newFeaturette)
    .subscribe(
      data => {
        this.alertService.success(this.newFeaturette.title+' inserita!', false);
        this.isCollapsed = true;
        this.collectionSize++;
        this.newFeaturette = new Featurette(null,null,null);
        this.loadData();
      },
      error => {
        this.alertService.error(error._body);
      });
  }

  delete(featurette) {
    this.idDelete = featurette._id;
    this.confirmDialog.open();
  }

  deleteFeaturette() {
    this.featuretteService.delete(this.idDelete).
    subscribe(
      data => {
        this.alertService.success('Featurette eliminata', false);
        this.collectionSize--;
        this.loadData();
      },
      error => {
        this.alertService.error(error._body);
      });
    }


  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData();
    }
  }

  loadData() {
    this.featuretteService.getPaged({
      limit: this.pageSize,
      page: this.page - 1,
      size: this.pageSize,
    }).subscribe(
      res  => this.onSuccess(res.json()),
      (res: Response) => this.onError(res.json())
    );
  }

  onSuccess (res) {
    this.featuretteList = res;
  }

  onError (res) {
    console.log("error:"+res);
  }
}
