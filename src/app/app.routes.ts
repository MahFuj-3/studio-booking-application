import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './error-handlers/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: ':languageId',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/features.routes').then((f) => f.featureRoutes),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/en/studio/list',
    pathMatch: 'full',
  },
  { path: '**', component: PageNotFoundComponent },
];
