import { Component, OnInit, ViewChild } from '@angular/core';
import { DTCarousel } from '../../shared/models';
import { CarouselService, AlertService } from '../../shared/services';

@Component({
  moduleId: module.id,
  selector: 'app-slides',
  templateUrl: 'slides.component.html'
})
export class SlidesComponent implements OnInit {
  public slides: DTCarousel[];
  isCollapsed = true;
  @ViewChild('insertForm') insertForm: any;
  @ViewChild('confirmDialog') confirmDialog: any;
  confirmTitle = 'Sicuro?';
  confirmText = 'Stai elminando una slide...';
  idDelete: string;

  page = 1;
  pageSize = 3;
  collectionSize = 0;
  previousPage: any;

  constructor(private carouselService: CarouselService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.carouselService.count().subscribe((res) => {
      this.collectionSize = res;
      if (this.collectionSize > 0) {
          this.loadData();
      }
    });
  }

  addSlide($event: any) {
    this.carouselService.insertUpload($event)
    .subscribe(
      data => {
        this.alertService.success('Inserito!', false);
        this.insertForm.setLoading(false);
        this.isCollapsed = true;
        this.collectionSize++;
        this.loadData();
      },
      error => {
        this.alertService.error(error._body);
      });
  }

  delete(slide: any) {
    this.idDelete = slide._id;
    this.confirmDialog.open();
  }

  deleteSlide() {
    this.carouselService.delete(this.idDelete).
    subscribe(result => {
        this.alertService.success('Slide eliminata', false);
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
    this.carouselService.getPaged({
      limit: this.pageSize,
      page: this.page - 1,
      size: this.pageSize,
    }).subscribe(
      res  => this.slides = res,
      (res: Response) => this.onError(res.json())
    );
  }

  onError (res: any) {
    console.log('error:' + res);
  }
}
