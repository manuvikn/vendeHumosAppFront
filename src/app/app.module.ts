import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/dom/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MainComponent } from './components/dom/main/main.component';
import { BodyComponent } from './components/dom/body/body.component';
import { CardComponent } from './components/card/card.component';
import { CrearVendeComponent } from './components/crear-vende/crear-vende.component';
import { InfoVendeComponent } from './components/info-vende/info-vende.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CommentComponent } from './components/comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    MainComponent,
    BodyComponent,
    CardComponent,
    CrearVendeComponent,
    InfoVendeComponent,
    ProfileComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
