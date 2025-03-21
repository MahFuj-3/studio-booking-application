import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './error-handlers/components/page-not-found/page-not-found.component';
import { StudioListComponent } from './features/studio/components/studio-list/studio-list.component';
import { BookingListComponent } from './features/booking/components/booking-list/booking-list.component';

export const routes: Routes = [
  // {
  //   path: ':languageId',
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () =>
  //         import('./features/features.routes').then((f) => f.featureRoutes),
  //     },
  //   ],
  // },
  {
    path: '',
    redirectTo: '/studio/list',
    pathMatch: 'full',
  },
  {
    path: 'studio/list',
    component: StudioListComponent,
  },
  {
    path: 'booking/list',
    component: BookingListComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];
