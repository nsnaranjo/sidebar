import { Component, EventEmitter, Input, Output } from '@angular/core';
import {CommonModule} from "@angular/common";

export interface AlertInterface {
  id: number,
  date: string,
  title: string,
  content: string,
  application: string,
}
@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss'
})
export class AlertsComponent {
  @Input() alerts: AlertInterface[] = []
  @Output() deleteAlert = new EventEmitter<number>()
  @Output() deleteAllAlerts = new EventEmitter<void>()

  removeAlert(id: number) {
    this.deleteAlert.emit(id)
  }
}
