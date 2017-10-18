import { Component, OnInit } from '@angular/core';
import { ROUTES } from './navbar-routes.config';
import { MenuType } from './navbar.metadata';
import { AuthenticationService } from '../services/index';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'my-navbar',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit {
  public menuItems: any[];
  public brandMenu: any;
  isCollapsed = true;
  public user: any;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.userValue.subscribe((nextValue) => {
      this.user = nextValue;
    });
  }

  ngOnInit() {
    this.user = this.authenticationService.getUser();
    this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND);
    this.brandMenu = ROUTES.filter(menuItem => menuItem.menuType === MenuType.BRAND)[0];
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }


  public getMenuItemClasses(menuItem: any) {
    return {
      'pull-xs-right': menuItem.menuType === MenuType.RIGHT
    };
  }
}
