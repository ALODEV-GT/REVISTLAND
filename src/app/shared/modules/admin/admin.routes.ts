
import { Routes } from "@angular/router";

export const ADMIN_ROUTES: Routes = [

    {
        path: '',
        loadComponent: () => import('./layout/admin-layer/admin-layer.component').then(m => m.AdminLayerComponent),
        children: [
            { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }

]