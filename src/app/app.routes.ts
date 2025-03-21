import { Routes } from '@angular/router';
import { authGuard } from '@shared/modules/auth/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
    },
    {
        path: 'welcome',
        loadComponent: () => import('./shared/pages/landing/landing.component')
    },
    {
        path: 'announcer',
        canActivate: [authGuard],
        loadChildren: () => import('./shared/modules/announcer/announcer.routes').then(m => m.ANNOUNCER_ROUTES),
    }
];
