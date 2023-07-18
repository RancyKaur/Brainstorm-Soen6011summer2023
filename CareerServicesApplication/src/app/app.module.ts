import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FakeBackendInterceptor, fakeBackendProvider } from './_helpers/fake_backend';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesModule } from 'primeng/messages';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MessagesModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    BrowserAnimationsModule,


  ],
  providers: [

    fakeBackendProvider

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
