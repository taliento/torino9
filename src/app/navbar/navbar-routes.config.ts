import { MenuType, RouteInfo } from './navbar.metadata';

export const ROUTES: RouteInfo[] = [
  { path: '', title: 'Torino9', menuType: MenuType.BRAND },
  { path: 'news', title: 'Novità', menuType: MenuType.LEFT },
  { path: 'calendar', title: 'Calendario', menuType: MenuType.LEFT },
  { path: 'about', title: 'Su di noi', menuType: MenuType.RIGHT },
  { path: 'contact', title: 'Contatti', menuType: MenuType.RIGHT }
];
