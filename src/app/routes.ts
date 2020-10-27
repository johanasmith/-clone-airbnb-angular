import { Routes } from '@angular/router';

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
      loadChildren: () => import('./booking/booking.module').then(mod => mod.BookingModule)
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