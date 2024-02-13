import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { ServicesComponent } from './services/services.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { ServiceComponent } from './dashboard/service/service.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { MapComponent } from './dashboard/map/map.component';
import { authenticationGuard } from './Guards-Repository/authentication.guard';
import { leavePageGuard } from './Guards-Repository/leave-page.guard';
import { resolveGuard } from './Guards-Repository/resolveGuard.guard';
import { MemberComponent } from './dashboard/member/member.component';
import { CustomAlertComponent } from './dashboard/custom-alert/custom-alert.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate : [authenticationGuard],
    resolve: {Alerts : resolveGuard},
    children: [
      {
        path: '',
        component: ServiceComponent
        
      },
      {
        path: 'service',
        component: ServiceComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'members',
        component: MemberComponent
      },
      {
        path: 'customAlerts',
        component: CustomAlertComponent
      },
      // {
      //   path: 'logout',
      //   component: LoginComponent
      // },
      {
        path: 'map',
        component: MapComponent
      }
    ]
  },
  {
    path: 'contact',
    component: ContactComponent,
    canDeactivate: [leavePageGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LoginComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'services',
    component: ServicesComponent
  },
  
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canDeactivate: [leavePageGuard]
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//, {enableTracing : true}