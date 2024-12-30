import { Component, inject, Input, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { CommonModule } from '@angular/common';
import { StateGlobalService } from '../../../../infrastructure/services/shared/state-global.service';
import { FileService } from '../../../../infrastructure/services/shared/file.service';
import { AvatarComponent } from "../../../shared/avatar/avatar.component";

@Component({
  selector: 'app-photo-profile',
  standalone: true,
  imports: [CommonModule, ButtonComponent, AvatarComponent],
  templateUrl: './photo-profile.component.html',
  styleUrl: './photo-profile.component.scss',
})
export class PhotoProfileComponent implements OnInit {
  @Input() previewPhoto!: string;
  @Input() currentPhoto!: string;
  @Input() photoName!: string;
  @Input() savePhoto: boolean = false;

  // StateGlobalService service is injected
  private readonly stateService = inject(StateGlobalService);
  // FileService service is injected
  private readonly fileService = inject(FileService);

  /**
   * The states of the service observables are obtained to store them in the respective variables
   */
  ngOnInit() {
    this.fileService.uploadPhoto$.subscribe((url) => {
      this.previewPhoto = url;
    });

    this.fileService.mainPhoto$.subscribe((url) => {
      this.currentPhoto = url;
    });

    this.fileService.photoName$.subscribe((name) => {
      this.photoName = name;
      this.truncatePhotoName();
    });

    this.fileService.savePhoto$.subscribe((state) => {
      this.savePhoto = state;
    });
  }

  /**
   * Get and store the URL of the uploaded file
   * @param event Cast the event to HTMLInputElement to access the selected files.
   */
  onUpload(event: Event): void {
    this.fileService.onPhotoSelected(event);
    this.fileService.onSave(false);
  }

  /**
   * Instantly save the URL of the uploaded file to store it as the current photo
   * Change the status specifically for the profile. Also Clear photo preview
   */
  onPhoto(): void {
    this.fileService.onConfirmationPhoto();
    this.fileService.onSave(true);
    this.fileService.onClearPreview(true);
    this.stateService.setState('profile', false);
  }

  /**
   * Change the status specifically for the profile and using the 'stateService'
   * service will desactivate it. Also Clear photo preview
   */
  onClose(): void {
    this.stateService.setState('profile', false);
    if (!this.currentPhoto || !this.savePhoto) {
      this.fileService.onClearPreview(true);
      this.fileService.onSave(true);
    }
  }

  /**
   * All states are cleared such as remove or delete functionality
   */
  onClear(): void {
    this.fileService.onClearPreview();
    this.fileService.onSave(false);
  }

  /**
   * Truncate the file name if it is longer than 5 characters and
   * Reconstructs the truncated name with the extension
   */
  truncatePhotoName(): void {
    if (this.photoName) {
      const dotIndex = this.photoName.lastIndexOf('.');
      const baseName = dotIndex > 0 ? this.photoName.substring(0, dotIndex) : this.photoName;
      const extension = dotIndex > 0 ? this.photoName.substring(dotIndex) : '';

      const truncatedBaseName = baseName.length > 6 ? baseName.substring(0, 5) + '...' : baseName;

      // New Name
      this.photoName = truncatedBaseName + extension;
    }
  }

}
