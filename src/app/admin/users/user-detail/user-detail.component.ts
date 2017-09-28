import { Component, Input } from '@angular/core';
import { User } from '../../../models/user';

@Component({
  moduleId: module.id,
  selector: 'dt-user-detail',
  templateUrl: 'user-detail.component.html',
  styleUrls: [
    './user-detail.component.css'
  ]
})
export class UserDetailComponent{
   @Input() user: User;

}
