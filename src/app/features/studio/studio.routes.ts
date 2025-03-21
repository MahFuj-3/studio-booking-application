import { Routes } from '@angular/router';
import { StudioRootComponent } from './studio-root/studio-root.component';
import { StudioListComponent } from './components/studio-list/studio-list.component';

export const studioRoutes: Routes = [
  {
    path: '',
    component: StudioRootComponent,
    children: [
      {
        path: 'list',
        component: StudioListComponent,
      },
    ],
  },
];
