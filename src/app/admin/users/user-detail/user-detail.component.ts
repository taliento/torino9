import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../shared/models';
import { UserService, AlertService } from '../../../shared/services';

@Component({
  moduleId: module.id,
  selector: 'app-user-detail',
  templateUrl: 'user-detail.component.html'
})
export class UserDetailComponent {
   @Input() user: User;
   @Output() delete: EventEmitter<any> = new EventEmitter();
   @Output() updated: EventEmitter<any> = new EventEmitter();
   @ViewChild('updateContent') updateContent;
   modalRef: NgbModalRef;

   constructor(private modalService: NgbModal, private userService: UserService,  private alertService: AlertService) { }

   deleteUser() {
     this.delete.emit(this.user);
   }

   update($event) {
     $event.append('_id', this.user._id);
     $event.append('imgPath', this.user.imgPath);
     this.userService.updateUpload($event).subscribe(
       data => {
         this.alertService.success('Modificato!', false);
         this.modalRef.close();
         this.updated.emit();
       },
       error => {
         this.alertService.error(error._body);
       });
   }

   modifyUser() {
     this.modalRef = this.modalService.open(this.updateContent);
   }
}
