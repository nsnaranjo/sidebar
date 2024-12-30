import {Injectable} from "@angular/core";
import {KeycloakAuthGuard, KeycloakService} from "keycloak-angular";
import {Router, UrlTree} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloakService: KeycloakService
  ) {
    super(router, keycloakService);
  }

  public async isAccessAllowed(): Promise<boolean | UrlTree> {
    try {
      // Validate if the user is authenticated
      const isLoggedIn = this.keycloakService.isLoggedIn();

      if (!isLoggedIn) {
        // Redirect to the login page
        window.location.href = 'https://spad2.com.co';
      }

      // Approve the access
      return true
    } catch (error) {
      window.location.href = 'https://spad2.com.co';
      

      // Deny the access
      return false;
    }
  }
}
