import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/index';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
