import { Routes } from '@angular/router';

const editorRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'publish',
    loadComponent: () =>
      import('./pages/publish/publish.page').then((m) => m.PublishPage),
  },
  {
    path: 'add-issue',
    loadComponent: () =>
      import('./pages/add-issue/add-issue.page').then((m) => m.AddIssuePage),
  },
  {
    path: 'published',
    loadComponent: () =>
      import('./pages/published/published.page').then((m) => m.PublishedPage),
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./pages/reports/reports.page').then((m) => m.ReportsPage),
  },
  {
    path: 'wallet',
    loadComponent: () =>
      import('./pages/wallet/wallet.page').then((m) => m.WalletPage),
  },
];

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'prefix',
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/layout/layout.component').then(
        (m) => m.LayoutComponent
      ),
    children: editorRoutes,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
