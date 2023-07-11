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

import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    LoginComponent,
    LandingPageComponent,

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
    ToastModule


  ]
})
export class AuthenticationModule { }
