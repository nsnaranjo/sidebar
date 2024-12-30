import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
@Input() styleButton: string | boolean | null = 'f-blue';
@Input() typeIcon!: string;
@Input() labelTitle: string = "Button Title";
@Input() action: 'submit' | 'button' | 'file' = 'button';
@Input() disabled: boolean = false;
@Input() previewUrl!: string;
@Input() isHovering: boolean = false;

@Output() onClick = new EventEmitter();
@Output() onChange = new EventEmitter();


  onMouseEnter(): void {
    this.isHovering = true;
  }

  onMouseLeave(): void {
    this.isHovering = false;
  }

  execFunc(event: Event) {
    this.onClick.emit(event);
  }

  onFileSelected(event: Event): void {
    this.onChange.emit(event);
  }
}

