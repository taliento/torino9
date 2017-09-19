import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/index';
import { AuthGuard } from './guards/index';

const appRoutes: Routes = [
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
