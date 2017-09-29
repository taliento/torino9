import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../models/user';
import { UserService, AlertService } from '../../../services/index';

@Component({
  moduleId: module.id,
  selector: 'dt-user-detail',
  templateUrl: 'user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent{
   @Input() user: User;

   @Output() delete: EventEmitter<any> = new EventEmitter();

   @ViewChild('updateContent') updateContent;

   constructor(private modalService: NgbModal, private userService: UserService,  private alertService: AlertService) {

   }

   deleteUser() {
     this.delete.emit(this.user);
   }

   update() {
     this.userService.update(this.user).subscribe(
       data => {
         this.alertService.success(this.user.username+' modificato con successo!', true);
       },
       error => {
         this.alertService.error(error._body);
       });
   }

   modifyUser() {
     this.modalService.open(this.updateContent);
   }
}
