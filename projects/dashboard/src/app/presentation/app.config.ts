import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';

import {provideStore} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";

import {KeycloakService} from "keycloak-angular";
import {initializeKeycloak} from "../infrastructure/config";

import {authReducer, AuthEffects} from "../application/state";

import { routes } from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // KeycloakService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   multi: true,
    //   deps: [KeycloakService]
    // },
    provideStore({
      auth: authReducer
    }),
    // provideEffects([AuthEffects]),
    provideAnimations()
  ]
};
