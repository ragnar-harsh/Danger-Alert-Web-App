import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './error/error.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FactsComponent } from './dashboard/facts/facts.component';
import { MapComponent } from './dashboard/map/map.component';
import { ServiceComponent } from './dashboard/service/service.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AlertModels } from './dashboard/Data-Services/AlertModels.service';
import { resolveGuard } from './Guards-Repository/resolveGuard.guard';
import { MemberComponent } from './dashboard/member/member.component';
import { CustomAlertComponent } from './dashboard/custom-alert/custom-alert.component';
import { TokenInterceptor } from './Interceptors/token.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../assets/environment/environment';
import { initializeApp } from 'firebase/app';
initializeApp(environment.firebase);



@NgModule({
  declarations: [
    AppComponent, LoginComponent, SignUpComponent, HomeComponent, ContactComponent, AboutComponent, ServicesComponent,
    DashboardComponent, ErrorComponent, FooterComponent, NavigationComponent,FactsComponent, MapComponent,
    ServiceComponent, ProfileComponent, MemberComponent, CustomAlertComponent,
  ],

  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],

  providers: [AlertModels, resolveGuard, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
