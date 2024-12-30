import {inject, Injectable} from "@angular/core";

import {Actions, ofType, createEffect} from '@ngrx/effects'

import {switchMap} from "rxjs/operators";

import {AuthKeycloakService} from "../../../infrastructure/services";

import {loadUserProfile, loadUserProfileSuccess, loadUserProfileFailure, logout} from "./auth.actions";

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions)
  private readonly authKeycloakService = inject(AuthKeycloakService)

  loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserProfile),
      switchMap(() =>
        this.authKeycloakService.getUserProfile().then(
          (user) => loadUserProfileSuccess({ user}),
          (error) => loadUserProfileFailure({ error })
        )
      )
    )
  )

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      switchMap(() =>
        this.authKeycloakService.logout().then(() => {
          return loadUserProfileFailure({error: 'Logged out'})
      }))
    )
  )
}
