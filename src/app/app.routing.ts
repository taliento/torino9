import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login';
import { ContactComponent } from './contact';
import { AboutUsComponent } from './about';
import {CustomPageComponent} from './custom-page/custom-page.component';
import { HomeComponent} from './home/home.component';
import { MainLayoutComponent} from './main-layout/main-layout.component';
import {BrancaComponent} from './branca/branca.component';
import {NewsComponent} from './news/news.component';
import {CalendarComponent} from './calendar/calendar.component';
import {AdminTabsComponent} from './admin/admin-tabs/admin-tabs.component';
import {CustomPageDetailComponent} from './admin/custom-page/custom-page-detail/custom-page-detail.component';
import {NewsListComponent} from './news/news-list';
import {NewsDetailComponent} from './news/news-detail';

const appRoutes: Routes = [
    {
      path: 'mainlayout', component: MainLayoutComponent ,
      children:[
        {
          path: 'home',
          component: HomeComponent
        },
        {
          path: 'calendar',
          component: CalendarComponent
        },
        {
          path: 'news',
          component: NewsComponent,
          children:[
            { path: 'list', pathMatch: 'full', component: NewsListComponent },
            { path: 'detail/:id', component: NewsDetailComponent }
          ]
        },
        {
          path: 'admin',
          component: AdminComponent,
          canActivate: [AuthGuard],
          children:[
            {
              path: 'tabs',  component: AdminTabsComponent,
            },
            {
              path: 'page/:id', component: CustomPageDetailComponent
            }
          ]
        },
        {
          path: 'about',
          component: AboutUsComponent
        },
        {
          path: 'contact',
          component: ContactComponent
        },
        {
          path: 'branca/:id',
          component: BrancaComponent
        }
      ]
    },
    {
      path: 'login',
      component: LoginComponent
    },
    // otherwise redirect to home
    {
      path: '**',
      redirectTo: 'mainlayout/home'
    }
];

export const routing = RouterModule.forRoot(appRoutes);

export const MODULE_COMPONENTS = [
  AboutUsComponent,
  ContactComponent,
  LoginComponent,
  CustomPageComponent,
  BrancaComponent
];
