import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './authentication.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';

import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AccountService } from './accountService.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ResumePageComponent } from './resume-page/resume-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
  declarations: [
    LoginComponent,
    LandingPageComponent,
    SignUpComponent,
    UserProfileComponent,
    ResumePageComponent,
    HomePageComponent,
    HeaderComponent,

  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    DividerModule,
    ToastModule,
    HttpClientModule,
    TooltipModule



  ],
  providers:[AccountService,]
})
export class AuthenticationModule { }
