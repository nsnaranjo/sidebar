import {createReducer, on} from "@ngrx/store";
import {loadUserProfileSuccess, logout} from "./auth.actions";
import {KeycloakProfile} from "keycloak-js";

export interface AuthState {
  user: KeycloakProfile | null;
}

const initialState: AuthState = {
  user: null
};

export const authReducer = createReducer(
  initialState,
  on(loadUserProfileSuccess, (state, {user}) => ({...state, user})),
  on(logout, () => initialState)
);
