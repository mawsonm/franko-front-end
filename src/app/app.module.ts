import { AccountComponent } from './account/account.component';
import { RouterModule, Routes } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import { MatButtonModule } from '@angular/material/button'
import player from 'lottie-web';

const routes : Routes = [
  {path: '', component: HomeComponent},
  {path: 'account', component: AccountComponent}
]
export function playerFactory(){
  return import("lottie-web");
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
     FormsModule,
     ReactiveFormsModule,
     RouterModule.forRoot(routes),
     LottieModule.forRoot({player: playerFactory})

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
