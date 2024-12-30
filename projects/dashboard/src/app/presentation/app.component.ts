import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";

import {Store} from "@ngrx/store";
import {loadUserProfile} from "../application/state";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  // constructor(private readonly store: Store){}

  ngOnInit(): void {
    // this.store.dispatch(loadUserProfile());
  }
}
