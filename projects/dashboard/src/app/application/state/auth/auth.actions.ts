import {createAction, props} from "@ngrx/store";
import {KeycloakProfile} from "keycloak-js";

export const loadUserProfile = createAction('[Auth] Load User Profile');

export const loadUserProfileSuccess = createAction(
  '[Auth] Load User Profile Success',
  props<{ user: KeycloakProfile }>()
)

export const loadUserProfileFailure = createAction(
  '[Auth] Load User Profile Failure',
  props<{ error: any }>()
)

export const logout = createAction('[Auth] Logout');
