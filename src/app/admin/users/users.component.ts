import { Component, OnInit, ViewChild } from '@angular/core';

import { User } from '../../models/index';
import { UserService, AuthenticationService, AlertService } from '../../services/index';

@Component({
  moduleId: module.id,
  selector: 'dt-users',
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit{
  currentUser: any;
  users: User[] = [];
  newUser: User = new User();
  isCollapsed = true;

  @ViewChild('confirmDialog') confirmDialog;
  confirmTitle = 'Sicuro?';
  confirmText = 'Stai elminando un utente...';
  idDelete: string;

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private alertService: AlertService) {
    authenticationService.userValue.subscribe((nextValue) => {
      this.currentUser = nextValue;
    })
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  delete(user) {
    this.idDelete = user._id;
    this.confirmDialog.open();
  }

  deleteUser() {
    this.userService.delete(this.idDelete).
    subscribe(
      data => {
        this.alertService.success('Utente eliminato', false);
        this.loadAllUsers();
      },
      error => {
        this.alertService.error(error._body);
      });
    }

    addUser() {
      this.userService.create(this.newUser)
      .subscribe(
        data => {
          this.alertService.success(this.newUser.username+' benvenuto/a!', false);
          this.isCollapsed = true;
          this.loadAllUsers();
        },
        error => {
          this.alertService.error(error._body);
        });
      }

      loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
      }
    }
