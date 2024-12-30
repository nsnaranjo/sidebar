import { Component, EventEmitter, Input, Output } from '@angular/core';
import {CommonModule} from "@angular/common";
import {AlertInterface} from "../alerts/alerts.component";

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  @Input() notifications: AlertInterface[] = []
  @Output() deleteNotification = new EventEmitter<number>()
  @Output() deleteAllNotifications = new EventEmitter<void>()

  removeNotification(id: number) {
    this.deleteNotification.emit(id)
  }
}
