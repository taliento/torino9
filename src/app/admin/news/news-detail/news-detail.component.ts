import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { News } from '../../../shared/models';
import { NewsService, AlertService } from '../../../shared/services';

@Component({
  moduleId: module.id,
  selector: 'app-news-detail',
  templateUrl: 'news-detail.component.html'
})
export class NewsDetailComponent {
   @Input() news: News;
   @Output() delete: EventEmitter<any> = new EventEmitter();
   @ViewChild('updateContent') updateContent;

   constructor(private modalService: NgbModal,
     private newsService: NewsService,
     private alertService: AlertService) { }

   deleteNews() {
     this.delete.emit(this.news);
   }

   update() {
     this.newsService.update(this.news).subscribe(
       data => {
         this.alertService.success(this.news.title + ' modificato con successo!', false);
       },
       error => {
         this.alertService.error(error._body);
       });
   }

   modifyNews() {
     this.modalService.open(this.updateContent);
   }
}
