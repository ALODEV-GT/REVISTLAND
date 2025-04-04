
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
            { path: 'management/magazines', loadComponent: () => import('./pages/magazines/magazines.component').then(m => m.MagazinesComponent)},
            { path: 'reports/home', loadComponent: () => import('./pages/reports/home-report/home-report.component').then(m => m.HomeReportComponent)},
            { path: 'reports/earnings', loadComponent: () => import('./pages/reports/earnings/earnings.component').then(m => m.EarningsComponent)},
            { path: 'reports/posts-ad', loadComponent: () => import('./pages/reports/post-ad/post-ad.component').then(m => m.PostAdComponent)},
            { path: 'reports/announcers', loadComponent: () => import('./pages/reports/announcers/announcers.component').then(m => m.AnnouncersComponent)},
            { path: 'reports/top-magazines-subscriptions', loadComponent: () => import('./pages/reports/top-magazine-suscriptions/top-magazine-suscriptions.component').then(m => m.TopMagazineSuscriptionsComponent)},
            { path: 'reports/top-magazines-comments', loadComponent: () => import('./pages/reports/top-magazine-coments/top-magazine-coments.component').then(m => m.TopMagazineComentsComponent)},
            { path: 'reports/ads-effectiveness', loadComponent: () => import('./pages/reports/ad-effectiveness/ad-effectiveness.component').then(m => m.AdEffectivenessComponent)},
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }

]