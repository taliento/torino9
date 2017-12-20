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
import { PolicyComponent } from './policy/policy.component';

const appRoutes: Routes = [
    {
      path: 'mainlayout', component: MainLayoutComponent ,
      children: [
        {
          path: 'cookie-policy',
          component: PolicyComponent,
          data: { state: 'cookie-policy' }
        },
        {
          path: 'home',
          component: HomeComponent,
          loadChildren: './home/home.module#HomeModule',
          data: { state: 'home' }
        },
        {
          path: 'admin',
          component: AdminComponent,
          canActivate: [AuthGuard],
          loadChildren: './admin/admin.module#AdminModule',
          data: { state: 'admin' }
        },
        {
          path: 'calendar',
          component: CalendarComponent,
          loadChildren: './calendar/calendar.module#CalendarModule',
          data: { state: 'calendar' }
        },
        {
          path: 'news',
          component: NewsComponent,
          loadChildren: './news/news.module#NewsModule',
          data: { state: 'news' }
        },
        {
          path: 'about',
          component: AboutUsComponent,
          data: { state: 'about' }
        },
        {
          path: 'contact',
          component: ContactComponent,
          data: { state: 'contact' }
        },
        {
          path: 'branca/:id',
          component: BrancaComponent,
          data: { state: 'branca/:id' }
        },
        {
          path: 'page/:id',
          component: CustomPageComponent,
          data: { state: 'page/:id' }
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
  BrancaComponent,
  PolicyComponent,
  MainLayoutComponent
];
