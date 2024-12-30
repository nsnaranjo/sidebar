import {Injectable} from "@angular/core";

import {KeycloakProfile} from "keycloak-js";

import {AuthKeycloakService} from "../../infrastructure/services";

interface RouteResolver<T> { }

@Injectable({
  providedIn: 'root',
})
export class UserProfileResolver implements RouteResolver<KeycloakProfile> {
  constructor(private readonly authService: AuthKeycloakService) {}

  /**
   * Resolve the user profile.
   *
   * This method is called automatically by Angular when the route is
   * activated. It returns a promise that resolves with the user profile
   * or rejects with an error.
   *
   * @returns A promise that resolves with the user profile.
   */
  async resolve(): Promise<KeycloakProfile> {
    try {
      return await this.authService.getUserProfile();
    } catch (error) {
      console.error('Error to load user profile:', error);

      throw error;
    }
  }
}
