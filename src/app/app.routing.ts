import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards';
import { LoginComponent } from './login';
import { ContactComponent } from './contact';
import { AboutUsComponent } from './about';
import { CustomPageComponent } from './custom-page/custom-page.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { BrancaComponent } from './branca/branca.component';
import { NewsComponent } from './news/news.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home//home.component';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
    {
      path: 'mainlayout', component: MainLayoutComponent ,
      children: [
        {
          path: 'home',
          component: HomeComponent,
          loadChildren: './home/home.module#HomeModule'
        },
        {
          path: 'admin',
          component: AdminComponent,
          canActivate: [AuthGuard],
          loadChildren: './admin/admin.module#AdminModule'
        },
        {
          path: 'calendar',
          component: CalendarComponent,
          loadChildren: './calendar/calendar.module#CalendarModule'
        },
        {
          path: 'news',
          component: NewsComponent,
          loadChildren: './news/news.module#NewsModule'
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
        },
        {
          path: 'page/:id',
          component: CustomPageComponent
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
