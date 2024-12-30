import {KeycloakService} from "keycloak-angular";
import {environment} from "../../../environments/environment";

/**
 * Initializes the Keycloak authentication service.
 *
 * @param keycloak - An instance of the KeycloakService.
 * @returns A function that initializes Keycloak with the specified configuration.
 *
 * The configuration includes:
 * - URL: The Keycloak server URL.
 * - Realm: The realm to authenticate against.
 * - ClientId: The client identifier for the application.
 *
 * The initialization options include:
 * - onLoad: Specifies the action to perform on page load. 'check-sso' checks if the user is already authenticated.
 * - silentCheckSsoRedirectUri: The URI for silent SSO check, typically used to restore login sessions.
 */
export function initializeKeycloak(keycloak: KeycloakService) {
  return () => keycloak.init({
    config: {
      url: environment.keycloak.url,
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.clientId
    },
    initOptions: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
    }
  })
}
export default  initializeKeycloak;
