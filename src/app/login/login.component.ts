import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../shared/services';
import { User } from '../shared/models';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    model: User = new User();
    loading = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(
        data => {
            this.alertService.success('Accesso effettuato!');
            this.router.navigate(['mainlayout/home']);
        },
        error => {
            console.log(error);
            if (error.status === 401) {
              this.alertService.warning(error._body);
            } else if (error.status === 400) {
              this.alertService.error('Servizio non disponibile');
            }

            this.loading = false;
        });
    }

    googleLogin() {
      this.authenticationService.googleLogin()
      .subscribe(
      data => {
          this.alertService.success('Accesso effettuato!');
          this.router.navigate(['mainlayout/home']);
      },
      error => {
          console.log(error);
          if (error.status === 401) {
            this.alertService.warning(error._body);
          } else if (error.status === 400) {
            this.alertService.error('Servizio non disponibile');
          }

          this.loading = false;
      });
    }
}
