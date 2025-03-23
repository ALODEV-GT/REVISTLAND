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
        data: {
            role: 'ANNOUNCER'
        },
        loadChildren: () => import('./shared/modules/announcer/announcer.routes').then(m => m.ANNOUNCER_ROUTES),
    },
    {
        path: 'editor',
        canActivate: [authGuard],
        data: {
            role: 'EDITOR'
        },
        loadChildren: () => import('@editor/editor.routes').then(m => m.routes),
    },
    {
        path: 'admin',
        canActivate: [authGuard],
        data: {
            role: 'ADMIN'
        },
        loadChildren: () => import('./shared/modules/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    },
];
