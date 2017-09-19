import { MenuType, RouteInfo } from './navbar.metadata';

export const ROUTES: RouteInfo[] = [
  { path: '', title: 'Torino9', menuType: MenuType.BRAND },
  { path: 'news', title: 'News', menuType: MenuType.LEFT },
  { path: 'calendar', title: 'Calendar', menuType: MenuType.LEFT },
  { path: 'about', title: 'About Us', menuType: MenuType.RIGHT },
  { path: 'contact', title: 'Contact', menuType: MenuType.RIGHT }
];
