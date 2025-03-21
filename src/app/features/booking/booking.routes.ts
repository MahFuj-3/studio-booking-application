import { Routes } from '@angular/router';
import { BookingRootComponent } from './booking-root/booking-root.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';

export const bookingRoutes: Routes = [
  {
    path: '',
    component: BookingRootComponent,
    children: [
      {
        path: 'list',
        component: BookingListComponent,
      },
    ],
  },
];
