import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/index';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/index';
import { ContactComponent } from './contact/index';
import { AboutUsComponent } from './about/index';

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
  LoginComponent
];
