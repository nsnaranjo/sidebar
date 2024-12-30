import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "./auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>('auth')

export const selectUserProfile = createSelector(
  selectAuthState,
  (state) => {
    return state.user
  }
)

export const selectUserName = createSelector(
  selectAuthState,
  (state) => state.user?.firstName ?? 'N/A'
)
