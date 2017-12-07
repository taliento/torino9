import { Component, OnInit } from '@angular/core';
import { ROUTES } from './navbar-routes.config';
import { MenuType } from './navbar.metadata';
import { AuthenticationService, CustomPageService } from '../shared/services';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public menuItems: any[];
  public brandMenu: any;
  isCollapsed = true;
  public user: any;

  constructor(
     private authenticationService: AuthenticationService,
     private customPageService: CustomPageService,
     private router: Router) {
    this.authenticationService.userValue.subscribe((nextValue) => {
      this.user = nextValue;
    });
  }

  ngOnInit() {
    this.user = this.authenticationService.getUser();
    this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND);


    const pages = { path: '#', param: '', title: 'Altro', dropdown: true, menuType: MenuType.LEFT, childs: []};
    this.customPageService.get().then((results) => {// custom pages
      const pagesNumber = results.length;
      let i = 0;
      for (i ; i < pagesNumber ; i++) {
        const pageItem = results[i];
         pages.childs.push({
          title : pageItem.menuLabel,
          path: '/mainlayout/page',
          param: pageItem._id,
          dropdown: false,
          menuType: MenuType.LEFT,
          childs: []
        });
      }

      if (pagesNumber > 0) {
          this.menuItems.push(pages); // pages dropdown
      }

    });

    this.brandMenu = ROUTES.filter(menuItem => menuItem.menuType === MenuType.BRAND)[0];
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['mainlayout/home']);
  }


  public getMenuItemClasses(menuItem: any) {
    return {
      'pull-xs-right': menuItem.menuType === MenuType.RIGHT
    };
  }
}
