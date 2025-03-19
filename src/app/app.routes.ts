import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'welcome',
        loadComponent: () => import('./shared/pages/landing/landing.component')
    },
    {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
    },
    {  
        path: 'announcer',
        loadChildren: () => import('./shared/modules/announcer/announcer.routes').then(m => m.ANNOUNCER_ROUTES),
    },
];
