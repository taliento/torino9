import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login';
import { ContactComponent } from './contact';
import { AboutUsComponent } from './about';
import {CustomPageComponent} from './custom-page/custom-page.component';

const appRoutes: Routes = [
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
    { path: 'about', component: AboutUsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'login', component: LoginComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

export const MODULE_COMPONENTS = [
  AboutUsComponent,
  ContactComponent,
  LoginComponent,
  CustomPageComponent
];
