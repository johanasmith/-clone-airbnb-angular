import { Routes } from '@angular/router';
import {OnlyLoggedInUsersGuardGuard} from 'src/app/shared/guards/only-logged-in-users-guard.guard';

export const routes: Routes = [
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
    },
    {
      path: 'detail/:id',
      loadChildren: () => import('./detail/detail.module').then(mod => mod.DetailModule)
    },
    {
      path: 'booking/:id',
      loadChildren: () => import('./booking/booking.module').then(mod => mod.BookingModule),
      canActivate: [OnlyLoggedInUsersGuardGuard]
    },
    {
      path: 'signin',
      loadChildren: () => import('./signin/signin.module').then(mod => mod.SigninModule)
    },
    {
      path: 'signout',
      loadChildren: () => import('./signout/signout.module').then(mod => mod.SignoutModule)
    }
    ,
    {
      path: '404',
      loadChildren: () => import('./error-page/error-page.module').then(mod => mod.ErrorPageModule)
    },
    {
      path: '**',
      redirectTo: '/404'
    }
  ];