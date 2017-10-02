import { Component, OnInit, ViewChild } from '@angular/core';
import { DTCarousel } from '../../models/dt-carousel.model';
import { CarouselService, AlertService } from '../../services/index';

@Component({
  moduleId: module.id,
  selector: 'dt-slides',
  templateUrl: 'slides.component.html'
})
export class SlidesComponent implements OnInit{
  public slides: DTCarousel[];
  newSlide: DTCarousel = new DTCarousel();
  isCollapsed = true;

  @ViewChild('confirmDialog') confirmDialog;
  confirmTitle = 'Sicuro?';
  confirmText = 'Stai elminando una slide...';
  idDelete: string;

  page = 1;
  pageSize = 3;
  collectionSize = 0;
  previousPage: any;

  constructor(private carouselService: CarouselService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.carouselService.count().subscribe((res) => {
      this.collectionSize = parseInt(res.json().count);
      if(this.collectionSize > 0) {
          this.loadData();
      }
    });
  }

  addSlide() {
    this.carouselService.insert(this.newSlide)
    .subscribe(
      data => {
        this.alertService.success(this.newSlide.title+' inserita!', false);
        this.isCollapsed = true;
        this.newSlide = new DTCarousel();
        this.collectionSize++;
        this.loadData();
      },
      error => {
        this.alertService.error(error._body);
      });
  }

  delete(slide) {
    this.idDelete = slide._id;
    this.confirmDialog.open();
  }

  deleteSlide() {
    this.carouselService.delete(this.idDelete).
    subscribe(
      data => {
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
      res  => this.onSuccess(res.json()),
      (res: Response) => this.onError(res.json())
    );
  }

  onSuccess (res) {
    this.slides = res;
  }

  onError (res) {
    console.log("error:"+res);
  }
}
