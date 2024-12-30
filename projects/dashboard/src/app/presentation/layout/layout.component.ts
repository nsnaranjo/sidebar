import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {FloatingUserWidgetComponent} from "./components/floating-user-widget/floating-user-widget.component";
import { HeaderComponent } from "./components/header/header.component";


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    FloatingUserWidgetComponent,
    HeaderComponent
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isSidebarExpanded = false;

  handleSidebarToggle(isExpanded: boolean) {
    this.isSidebarExpanded = isExpanded;
  }
}
