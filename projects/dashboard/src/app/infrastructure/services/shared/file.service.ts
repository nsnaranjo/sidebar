import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  // Subjects and Observables
  private readonly uploadPhotoSubject = new BehaviorSubject<string>('');
  uploadPhoto$: Observable<string> = this.uploadPhotoSubject.asObservable();

  private readonly mainPhoto = new BehaviorSubject<string>('');
  mainPhoto$: Observable<string> = this.mainPhoto.asObservable();

  private readonly photoNameSubject = new BehaviorSubject<string>('');
  photoName$: Observable<string> = this.photoNameSubject.asObservable();

  private readonly savePhotoSubject = new BehaviorSubject<boolean>(false);
  savePhoto$: Observable<boolean> = this.savePhotoSubject.asObservable();

  /**
   * Capture the input file to access the uploaded file and save the URL for preview
   * @param event Cast the event to HTMLInputElement to access the selected files.
   * @returns
   */
  onPhotoSelected(event: Event): void {
    const file = this.getSelectedFile(event);

    if (!file) return; // If there is no file, end.

    if (!this.isImageTypeValid(file)) {
      alert('Por favor selecciona un archivo de imagen.');
      return;
    }

    this.photoNameSubject.next(file.name);
    this.readFileAndValidateImage(file);
  }

  /**
   * Confirm and save the currently previewed photo.
   */
  onConfirmationPhoto(): void {
    const currentPreview = this.uploadPhotoSubject.getValue();
    if (currentPreview) {
      this.mainPhoto.next(currentPreview);
    }
  }

  /**
   * Updates the save state.
   * @param state Save status.
   */
  onSave(state: boolean): void {
    this.savePhotoSubject.next(state);
  }

  /**
   * Clear preview and other states.
   * @param isFirstUpload Indicates whether only previews will be cleared
   */
  onClearPreview(isFirstUpload: boolean = false): void {
    this.uploadPhotoSubject.next('');
    this.photoNameSubject.next('');
    if (!isFirstUpload) {
      this.mainPhoto.next('');
    }
  }

  // Private Methods

  /**
   * Extracts the selected file from the event.
   * @param event File input event.
   * @returns Selected file or null.
   */
  private getSelectedFile(event: Event): File | null {
    const input = event.target as HTMLInputElement;
    return input.files?.length ? input.files[0] : null;
  }

  /**
   * Validates if the file type is an image.
   * @param file File to validate.
   * @returns True if the file is an image.
   */
  private isImageTypeValid(file: File): boolean {
    return file.type.startsWith('image/png') || file.type.startsWith('image/jpeg') || file.type.startsWith('image/bmp');
  }

  /**
   * Read and validate the selected image.
   * @param file File uploaded
   */
  private readFileAndValidateImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result as string;
      this.uploadPhotoSubject.next(result);
    };
    reader.readAsDataURL(file);
  }
}
