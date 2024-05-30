import { Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { WelcomeComponent } from './Component/welcome/welcome.component';
import { DriverComponent } from './Component/driver/driver.component';
import { authGuard } from './guards/auth-guard.guard';
import { DriversListComponent } from './Component/drivers-list/drivers-list.component';

export type RoutesParams = 'login' | 'register' | 'home';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'drivers', component: DriversListComponent, canActivate: [authGuard] },
  {
    path: 'driver/add',
    component: DriverComponent,
    canActivate: [authGuard],
  },
  { path: '**', component: LoginComponent },
];
