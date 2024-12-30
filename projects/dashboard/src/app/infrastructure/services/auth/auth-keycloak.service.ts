import {inject, Injectable} from '@angular/core';

import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";

import {AuthServiceInterface} from "../../../domain";

@Injectable({
  providedIn: 'root'
})
export class AuthKeycloakService implements AuthServiceInterface{
  private readonly keycloakService = inject(KeycloakService)

  /**
   * Retrieves the user profile for the current user from Keycloak.
   *
   * This method returns a promise that resolves with the user profile
   * if the user is logged in, or rejects if the user is not logged in.
   *
   * If an error occurs while retrieving the user profile, the error
   * is caught and re-thrown.
   *
   * @returns A promise that resolves with the user profile if the user
   * is logged in, or rejects if the user is not logged in.
   */
  public async getUserProfile(): Promise<KeycloakProfile> {
    try {
      return await this.keycloakService.loadUserProfile()
    } catch (error) {
      console.error('Error loading user profile', error)
      throw error
    }
  }

  /**
   * Logs the user out of Keycloak.
   *
   * This method logs the user out of Keycloak and clears the user's session.
   *
   * If an error occurs while logging out, the error is caught and re-thrown.
   *
   * @returns A promise that resolves when the user has been logged out, or
   * rejects if an error occurs.
   */
  async logout(): Promise<void> {
    try {
      await this.keycloakService.logout();
    } catch (error) {
      console.error('Error logging out', error);
      throw error
    }
  }

  /**
   * Determines if the user is currently logged in to Keycloak.
   *
   * @returns `true` if the user is logged in, `false` otherwise.
   */
  isLoggedIn(): boolean {
    return this.keycloakService.isLoggedIn();
  }
}
