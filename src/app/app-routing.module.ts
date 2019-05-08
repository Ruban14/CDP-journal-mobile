import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', redirectTo: 'login', pathMatch: 'full' },
  { path: 'user-login', loadChildren: './login/user-login/user-login.module#UserLoginPageModule' },
  { path: '', loadChildren: './home/home.module#HomePageModule' },
  { path: 'register-subscriber', loadChildren: './register-subscriber/register-subscriber.module#RegisterSubscriberPageModule' },
  { path: 'online-register', loadChildren: './online-register/online-register.module#OnlineRegisterPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
