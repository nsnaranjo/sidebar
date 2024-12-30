import {AsyncPipe, CommonModule} from "@angular/common";
import {Component} from '@angular/core';
import {Observable} from "rxjs";

import {KeycloakProfile} from "keycloak-js";

import {Store} from "@ngrx/store";
import {selectUserProfile} from "../../../application/state";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsyncPipe, CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent  {
  // user$: Observable<KeycloakProfile | null>

  /**
   * DashboardComponent constructor.
   * @param store The store which holds the user profile
   */
  // constructor(private readonly store: Store) {
    // this.user$ = this.store.select(selectUserProfile)
  // }
}
