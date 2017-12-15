import { MenuType, RouteInfo } from './navbar.metadata';

export const ROUTES: RouteInfo[] = [
  { path: '#', param: '', title: 'AGESCI', dropdown: false, menuType: MenuType.BRAND, childs: [] },
  { path: '/mainlayout/news/list', param: '', title: 'Novità', dropdown: false, menuType: MenuType.LEFT, childs: [] },
  { path: '/mainlayout/calendar', param: '', title: 'Calendario', dropdown: false, menuType: MenuType.LEFT, childs: [] },
  { path: '/mainlayout/about', param: '', title: 'Su di noi', dropdown: false, menuType: MenuType.LEFT, childs: [] },
  { path: '/mainlayout/contact', param: '', title: 'Contatti', dropdown: false, menuType: MenuType.LEFT, childs: [] },
  { path: '#', param: '', title: 'Le Branche', dropdown: true, menuType: MenuType.LEFT,
  childs: [
    { path: '/mainlayout/branca', param: 'LC',  title: 'Lupetti', dropdown: false, menuType: MenuType.LEFT, childs: [] },
    { path: '/mainlayout/branca', param: 'EG', title: 'Esploratori e Guide', dropdown: false, menuType: MenuType.LEFT, childs: [] },
    { path: '/mainlayout/branca', param: 'RS', title: 'Rover e Scolte', dropdown: false, menuType: MenuType.LEFT, childs: [] }
  ] },
];
