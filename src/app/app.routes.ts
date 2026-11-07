import { ForgetPasswordComponent } from './features/forget-password/forget-password.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ChangePasswordComponent } from './features/change-password/change-password.component';
import { NotificationComponent } from './features/notification/notification.component';
import { ProfileComponent } from './features/profile/profile.component';
import { TimelineComponent } from './features/timeline/timeline.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { authGuard } from './core/auth/guard/auth-guard';
import { guestGuard } from './core/auth/guard/guest-guard';
import { PostDetailsComponent } from './features/post-details/post-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgetpassword', component: ForgetPasswordComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'changepassword', component: ChangePasswordComponent },
      { path: 'notifications', component: NotificationComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'timeline', component: TimelineComponent },
      { path: 'details/:id', component: PostDetailsComponent },
    ],
  },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: 'notfound' },
];
