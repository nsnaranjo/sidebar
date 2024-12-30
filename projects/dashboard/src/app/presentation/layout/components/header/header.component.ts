import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FloatingUserWidgetComponent } from '../floating-user-widget/floating-user-widget.component';
import { StateGlobalService } from '../../../../infrastructure/services/shared/state-global.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, FloatingUserWidgetComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // StateGlobalService service is injected
  private readonly stateService = inject(StateGlobalService);

  /**
   * Change the status specifically for the sidebar and using the 'stateService'
   * service will activate it or desactivate it
   */
  toggleSidebar() {
    this.stateService.toggleState('sidebar');
  }
}
