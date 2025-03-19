import { Routes } from '@angular/router';
import { FeaturesRootComponent } from './features-root/features-root.component';
import { StudioListComponent } from './studio/components/studio-list/studio-list.component';

export const featureRoutes: Routes = [
  {
    path: 'studio',
    loadChildren: () =>
      import('./studio/studio.routes').then((f) => f.studioRoutes),
  },
];
