import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, Input, OnInit, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { logout, selectUserName, selectUserProfile } from '../../../../application/state';
import { AvatarComponent } from '../../../shared/avatar/avatar.component';
import { KeycloakProfile } from 'keycloak-js';
import { PhotoProfileComponent } from '../photo-profile/photo-profile.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { StateGlobalService } from '../../../../infrastructure/services/shared/state-global.service';
import { FileService } from '../../../../infrastructure/services/shared/file.service';

@Component({
  selector: 'app-floating-user-widget',
  standalone: true,
  imports: [AsyncPipe, CommonModule, AvatarComponent, PhotoProfileComponent, ButtonComponent],
  templateUrl: './floating-user-widget.component.html',
  styleUrl: './floating-user-widget.component.scss',
})
export class FloatingUserWidgetComponent implements OnInit {
  @Input() isFloating!: boolean;
  @Input() isOpen: boolean = false;
  @Input() isProfile: boolean = false;

  // Store service is injected
  private readonly store = inject(Store);
  // StateGlobalService service is injected
  private readonly stateService = inject(StateGlobalService);
  // FileServcice service is injected
  private readonly fileService = inject(FileService);

  letter$!: Observable<string>;
  user$!: Observable<KeycloakProfile | null>;

  menuSettings = [
    {
      icon: 'icon-config',
      title: 'Configuración de perfil',
    },
    {
      icon: 'icon-question1',
      title: 'Centro de soporte',
    },
    {
      icon: 'icon-log_out',
      title: 'Cerrar sesion',
    },
  ];

  /**
   * Creates an instance of FloatingUserWidgetComponent.
   * and a store which holds the user profile
   * Also, We subscribe to the specific state of the profile within the `state$` observable.
   * to update the local property `isOpen` and 'isProfile' with the issued state.
   */
  ngOnInit() {
    this.letter$ = this.store
      .select(selectUserName)
      .pipe(map((username) => (username ? username.charAt(0).toUpperCase() : '')));
    this.user$ = this.store.select(selectUserProfile);
    // Modal State
    this.stateService.state$['modal'].subscribe((state) => {
      this.isOpen = state;
    });
    // Profile State
    this.stateService.state$['profile'].subscribe((state) => {
      this.isProfile = state;
    });
  }

  /**
   * Change the status specifically for the modal and using the 'stateService'
   * service will activate it or desactivate it
   */
  toggleModal(): void {
    this.stateService.toggleState('modal');
    if (!this.isOpen) {
      this.stateService.setState('profile', false);
    }
  }

  @ViewChild('modal') modalProfile!: ElementRef;
  /**
   * The event is detected outside the modal reference to correctly close open modals
   * @param event Clic Event in DOM
   * @returns
   */
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const targetElement = event.target as HTMLElement;
    const modalElement = this.modalProfile?.nativeElement;

    // Check if the click was on elements that shouldn't close the modal
    const isToggleButton = targetElement.closest('.avatar__button');
    const isModal = targetElement.closest('.modal');

    if (isToggleButton || isModal) return;

    // If the modal is open and the click was outside the modal
    if (modalElement && !modalElement.contains(targetElement)) {
      this.stateService.setState('modal', false);
      this.stateService.setState('profile', false);
      this.fileService.onClearPreview(true);
      this.fileService.onSave(true);
    }
  }

  /**
   * Detect changes in screen resolution size to hide the hamburger menu
   * @param event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth < 768 && this.isOpen) {
      this.stateService.setState('modal', false);
    }
  }

  /**
   * Handles a click event on a menu item. If the clicked item is the logout button (index 2),
   * it logs out the user by dispatching a logout action and removing the user's avatar color
   * from local storage. If an error occurs during the process, it is logged to the console.
   *
   * @param index The index of the menu item that was clicked.
   * @returns {Promise<void>} A promise that resolves when the logout process is complete.
   */
  async handleMenuClick(index: number): Promise<void> {
    if (index === 2) {
      try {
        await this.logout();
      } catch (error) {
        console.error('Error logout', error);
      }
    }
  }

  /**
   * Logs out the user by dispatching a logout action and removing the user's avatar color
   * from local storage. If an error occurs during the process, it is logged to the console.
   *
   * @returns {Promise<void>} A promise that resolves when the logout process is complete.
   */
  async logout(): Promise<void> {
    try {
      this.store.dispatch(logout());

      localStorage.removeItem('userAvatarColor');
    } catch (error) {
      console.error('Error logout', error);
    }
  }
}
