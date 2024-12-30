import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectUserName } from '../../../application/state';
import { StateGlobalService } from '../../../infrastructure/services/shared/state-global.service';
import { FileService } from '../../../infrastructure/services/shared/file.service';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent implements OnInit {
  @Input() isFloating!: boolean;
  @Input() isPhoto!: boolean;
  @Input() isPreview: boolean = false;
  @Input() uploadPhoto: boolean = false;
  @Input() urlPhoto!: string;

  @Output() onClick = new EventEmitter();

  // Store service is injected
  private readonly store = inject(Store);
  // StateGlobalService service is injected
  private readonly stateService = inject(StateGlobalService);
  // FileService service is injected
  private readonly fileService = inject(FileService);

  letter$!: Observable<string>;

  /**
   * Creates an instance of FloatingUserWidgetComponent.
   * and a store which holds the user profile
   * Also, We subscribe to the specific state of the profile within the `state$` observable.
   * to update the local property `uploadPhoto` with the issued state.
   */
  ngOnInit() {
    this.letter$ = this.store
      .select(selectUserName)
      .pipe(map((username) => (username ? username.charAt(0).toUpperCase() : '')));
    // Profile State
    this.stateService.state$['profile'].subscribe((state) => {
      this.uploadPhoto = state;
    });
    // File Upload State
    this.fileService.mainPhoto$.subscribe((url) => {
      this.urlPhoto = url;
    });
  }

  toggleFunc() {
    this.onClick.emit();
  }

  /**
   * Change the status specifically for the profile and using the 'stateService'
   * service will activate it
   */
  toggleUpload(): void {
    this.stateService.setState('profile', true);
  }
}
