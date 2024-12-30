import {KeycloakProfile} from "keycloak-js";

export interface AuthServiceInterface {
  getUserProfile(): Promise<KeycloakProfile>
  logout(): Promise<void>
  isLoggedIn(): boolean
}
