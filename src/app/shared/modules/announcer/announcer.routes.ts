import { Routes } from "@angular/router";
import { DashboardAnnouncerComponent } from "./pages/dashboard-announcer/dashboard-announcer.component";


export const ANNOUNCER_ROUTES: Routes = [

    {
        path: '',
        loadComponent: () => import('./layout/announcer-layer/announcer-layer.component').then(m => m.AnnouncerLayerComponent),
        children: [
          { path: 'dashboard', loadComponent: () => import('./pages/dashboard-announcer/dashboard-announcer.component').then(m => m.DashboardAnnouncerComponent) },
          { path: 'post-ad', loadComponent: () => import('./pages/post-ad/post-ad.component').then(m => m.PostAdComponent) },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
      },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];