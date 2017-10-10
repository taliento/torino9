export enum MenuType {
  BRAND,
  LEFT,
  RIGHT
}

export interface RouteInfo {
  path: string;
  param: string;
  title: string;
  dropdown: boolean;
  menuType: MenuType;
  childs: RouteInfo[];
}
