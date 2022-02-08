import { Component, Inject, OnInit } from '@angular/core';

import { OktaAuthStateService } from '@okta/okta-angular';

import { OKTA_AUTH } from '@okta/okta-angular';

import { OktaAuth } from '@okta/okta-auth-js';

import * as OktaSignIn from '@okta/okta-signin-widget';
import { Container, Main } from 'tsparticles';
import myAppConfig from '../config/my-app-config';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  oktaSignIn: any;

  constructor(
    private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) {
    this.oktaSignIn = new OktaSignIn({
      logo: 'assets/images/logo1.png',
      features: {
        registration: true,
      },
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes,
      },
    });
  }

  ngOnInit(): void {
    this.oktaSignIn.remove();
    this.oktaSignIn.renderEl(
      {
        el: '#okta-sign-in-widget',
      },
      (response) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error) => {
        throw error;
      }
    );
  }
}
