import { MenuType, RouteInfo } from './navbar.metadata';

export const ROUTES: RouteInfo[] = [
  { path: '', param:'', title: 'Torino9', dropdown: false, menuType: MenuType.BRAND, childs:[] },
  { path: 'news',param:'', title: 'Novità', dropdown: false, menuType: MenuType.LEFT, childs:[] },
  { path: 'calendar',param:'', title: 'Calendario', dropdown: false, menuType: MenuType.LEFT, childs:[] },
  { path: 'about',param:'', title: 'Su di noi', dropdown: false, menuType: MenuType.LEFT, childs:[] },
  { path: 'contact',param:'', title: 'Contatti', dropdown: false, menuType: MenuType.LEFT, childs:[] },
  { path: '',param:'', title: 'Le Branche', dropdown: true, menuType: MenuType.LEFT,
  childs:[
    { path: 'branca', param:'LC',  title: 'Lupetti', dropdown: false, menuType: MenuType.LEFT, childs:[] },
    { path: 'branca', param:'EG', title: 'Esploratori e Guide', dropdown: false, menuType: MenuType.LEFT, childs:[] },
    { path: 'branca', param:'RS',title: 'Rover e Scolte', dropdown: false, menuType: MenuType.LEFT, childs:[] }
  ] },
];
