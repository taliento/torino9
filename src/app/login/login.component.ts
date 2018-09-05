import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService, LoadingService } from '../shared/services';
import { User } from '../shared/models';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    model: User = new User();

    constructor(
        private route: ActivatedRoute,
        private loadingService: LoadingService,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {
        this.route.queryParams.subscribe((params) => {
          // console.log("login route params" + JSON.stringify(params));
          if(params['code']) {
            this.googleLogin(params['code']);
          }
        });
    }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loadingService.setLoading(true);
        this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(
        data => {
            this.loadingService.setLoading(false);
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
            this.loadingService.setLoading(false);
        });
    }

    googleAuth() {
      this.authenticationService.getOauthUrl()
      .subscribe(
          data => {
            window.location.href = data.url;
          },
          error => {
              console.log(error);
              if (error.status === 401) {
                this.alertService.warning(error._body);
              } else if (error.status === 400) {
                this.alertService.error('Servizio non disponibile');
              }
        });
    }

    googleLogin(code: string) {
      this.loadingService.setLoading(true);

      this.authenticationService.googleLogin(code)
      .subscribe(
      data => {
          this.loadingService.setLoading(false);
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
      });
    }
}
