/**
 * Created by cl-macmini-51 on 02/05/18.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';



export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: []
  },
  {
    path: 'login',
    component: LoginComponent,
    children: []
  },

];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class AuthenticationRoutingModule {}
