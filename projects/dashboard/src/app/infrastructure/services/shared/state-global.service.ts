import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateGlobalService {

// BehaviorSubject broadcasts the current value and new values ​​to all subscribers. This object represents the current state.
private readonly isStateSubject: Record<string, BehaviorSubject<boolean>> = {
  modal: new BehaviorSubject<boolean>(false),  // Modal State
  profile: new BehaviorSubject<boolean>(false),  // Profile State
  sidebar: new BehaviorSubject<boolean>(false),  // Sidebar State
};

// Converts `isStateSubject` to an observables object (`state$`) that only exposes the data stream, ensuring that subscribers cannot directly modify the BehaviorSubject.
state$ = Object.fromEntries(
  Object.entries(this.isStateSubject).map(([key, subject]) => [key, subject.asObservable()]),
);

/**
 * Toggles the boolean state of the BehaviorSubject corresponding to the `key`. First get the current value with `.getValue()` and then use `.next()` to output the opposite value.
 * @param key State value that should be in `isStateSubject`
 */
toggleState(key: string): void {
  this.isStateSubject[key].next(!this.isStateSubject[key].getValue());
}

/**
 * Sets a specific state for a key to `isStateSubject`.
 * @param key the state key to modify
 * @param action the new boolean value
 */
setState(key: string, action: boolean): void {
  this.isStateSubject[key].next(action);
}

}
