import { LoginStatusComponent } from './login-status/login-status.component';
import { MovinWords } from 'movinwords/dist/movinwords.js';
import { AccountComponent } from './account/account.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import player from 'lottie-web';
import { AboutComponent } from './about/about.component';
import { CartStatusComponent } from './cart-status/cart-status.component';
import { SwiperModule } from 'swiper/angular';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
} from '@okta/okta-angular';

import myAppConfig from './config/my-app-config';

import { OktaAuth } from '@okta/okta-auth-js';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';

const oktaConfig = Object.assign(
  {
    onAuthRequired: (injector) => {
      const router = injector.get(Router);

      // Redirect the user to your custom login page

      router.navigate(['/login']);
    },
  },
  myAppConfig.oidc
);

const oktaAuth = new OktaAuth(oktaConfig);

const routes: Routes = [
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: AccountComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: '', component: HomeComponent },
];
export function playerFactory() {
  return import('lottie-web');
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    AboutComponent,
    CartStatusComponent,
    LoginStatusComponent,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    OktaAuthModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
    }),
    LottieModule.forRoot({ player: playerFactory }),
    SwiperModule,
  ],
  providers: [{ provide: OKTA_CONFIG, useValue: { oktaAuth } }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
