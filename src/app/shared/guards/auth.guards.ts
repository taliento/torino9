import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    if (this.authenticationService.getUser()) {// user logged
      if(this.authenticationService.getUser().admin) {// admin logged
        return true;
      }
    }

    this.router.navigate(['mainlayout/home']);
    return false;
  }
}
