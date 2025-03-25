
import { Routes } from "@angular/router";

export const ADMIN_ROUTES: Routes = [

    {
        path: '',
        loadComponent: () => import('./layout/admin-layer/admin-layer.component').then(m => m.AdminLayerComponent),
        children: [
            { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
            { path: 'management/config-company', loadComponent: () => import('./pages/company/company.component').then(m => m.CompanyComponent) },
            { path: 'management/ads', loadComponent: () => import('./pages/ads/ads.component').then(m => m.AdsComponent) },
            { path: 'management/ads/disabled-ad/:slug', loadComponent: () => import('./pages/disabled-ad/disabled-ad.component').then(m => m.DisabledAdComponent)},
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }

]