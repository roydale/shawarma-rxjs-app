import { Routes } from '@angular/router';
import { TeamBuilderComponent } from './team-builder/team-builder.component';
import { ShawarmaMakerComponent } from './shawarma-maker/shawarma-maker.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'shawarma',
    pathMatch: 'full',
  },
  {
    path: 'team',
    component: TeamBuilderComponent,
  },
  {
    path: 'shawarma',
    component: ShawarmaMakerComponent,
  },
];
