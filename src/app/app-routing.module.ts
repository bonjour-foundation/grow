import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {IntroGuard} from './guards/intro.guard';
import {GoalGuard} from './guards/goal.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomePageModule),
    canActivate: [IntroGuard],
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then((m) => m.IntroPageModule),
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/goal/categories/categories.module').then((m) => m.CategoriesPageModule),
    canActivate: [IntroGuard],
  },
  {
    path: 'goal',
    loadChildren: () => import('./pages/goal/goal/list/list.module').then((m) => m.ListPageModule),
    canActivate: [IntroGuard, GoalGuard],
  },
  {
    path: 'goal/:category',
    loadChildren: () => import('./pages/goal/goal/list/list.module').then((m) => m.ListPageModule),
    canActivate: [IntroGuard, GoalGuard],
  },
  {
    path: 'goal/:category/:goal',
    loadChildren: () => import('./pages/goal/goal/detail/detail.module').then((m) => m.DetailPageModule),
    canActivate: [IntroGuard, GoalGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'corrected' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
