import { LayoutSubscriberComponent } from './modules/users/subscriber/components/layout-subscriber/layout-subscriber.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'welcome',
        loadComponent: () => import('@shared/pages/landing/landing.component')
    },
    {
        path: 'rl',
        component: LayoutSubscriberComponent,
        children: [
            {
                path: 'home',
                loadComponent: () => import('@subscriber/pages/home/home.component')
            },
            {
                path: 'my-subscriptions',
                loadComponent: () => import('@subscriber/pages/my-subscriptions/my-subscriptions.component')
            },
            {
                path: ':id',
                loadComponent: () => import('@subscriber/pages/magazine-detail/magazine-detail.component')
            }
        ]
    },
    {
        path: 'profile',
        loadComponent: () => import('@users/components/profile/profile.component')
    },
    {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
    }
];
