import { Component, OnInit, ViewChild } from '@angular/core';

import { User } from '../../shared/models';
import { UserService, AuthenticationService, AlertService } from '../../shared/services';

@Component({
  moduleId: module.id,
  selector: 'app-users',
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
  currentUser: any;
  users: User[] = [];
  isCollapsed = true;
  @ViewChild('insertForm') insertForm;
  @ViewChild('confirmDialog') confirmDialog;
  confirmTitle = 'Sicuro?';
  confirmText = 'Stai elminando un utente...';
  idDelete: string;

  page = 1;
  pageSize = 3;
  collectionSize = 0;
  previousPage: any;

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private alertService: AlertService) {
    authenticationService.userValue.subscribe((nextValue) => {
      this.currentUser = nextValue;
    });
  }

  ngOnInit() {
    this.userService.count().subscribe((res) => {
      this.collectionSize = res;
      if (this.collectionSize > 0) {
        this.loadData();
      }
    });
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
        this.collectionSize--;
        this.loadData();
      },
      error => {
        this.alertService.error(error._body);
      });
    }

    addUser($event) {
      this.userService.insertUpload($event)
      .subscribe(
        data => {
          this.alertService.success('Inserito!', false);
          this.insertForm.setLoading(false);
          this.isCollapsed = true;
          this.collectionSize++;
          this.loadData();
        },
        error => {
          console.log(error);
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
        this.userService.getPaged({
          limit: this.pageSize,
          page: this.page - 1,
          size: this.pageSize,
        }).subscribe(
          res  => this.users = res,
          (res: Response) => this.onError(res.json())
        );
      }


      onError (res) {
        console.log('error:' + res);
      }
    }
