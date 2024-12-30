import { CommonModule, NgOptimizedImage } from '@angular/common';
import {Component, EventEmitter, Output} from '@angular/core';
import {trigger, transition, style, animate, state, query, stagger, group} from "@angular/animations";

import { AvatarComponent } from '../../../shared/avatar/avatar.component';
import {Subject} from "rxjs";
import {NotificationsComponent} from "../../../shared/notifications/notifications.component";
import {AlertInterface, AlertsComponent} from "../../../shared/alerts/alerts.component";
import {PhotoProfileComponent} from "../photo-profile/photo-profile.component";

interface MenuItem {
  label: string,
  options?: string[],
  isExpanded: boolean
}

interface MenuSection {
  mainOption: string,
  icon: string,
  items: MenuItem[],
}

interface AlertsSection {
  mainOption: string,
  notifications: AlertInterface[]
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, AvatarComponent, NotificationsComponent, AlertsComponent, PhotoProfileComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('fadeInLeft', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-20px)'
        }),
        animate('1000ms cubic-bezier(0.4, 0, 0.2, 1)', style({
          opacity: 1,
          transform: 'translateX(0)'
        }))
      ]),
      transition(':leave', [
        style({
          transform: 'translateX(0)',
          opacity: 1,
          position: 'absolute',
        }),
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({
          opacity: 0,
          transform: 'translateX(-20px)',
          position: 'absolute',
        }))
      ])
    ]),
    trigger('circularAnimation', [
      transition(':enter', [
        query('.circular-menu__item', [
          style({
            opacity: 0,
            transform: 'translate(0, 0)'
          }),
          stagger(100, [
            animate('1000ms cubic-bezier(0.4, 0, 0.2, 1)', style({
              opacity: 1,
              transform: '*'
            }))
          ])
        ])
      ]),
      transition(':leave', [
        query('.circular-menu__item', [
          stagger(50, [
            animate('800ms cubic-bezier(0.4, 0, 0.2, 1)', style({
              opacity: 0,
              transform: 'translate(0, 0)'
            }))
          ])
        ])
      ])
    ]),
    trigger('submenuAnimation', [
      state('expanded', style({
        height: '*',
        opacity: 1,
        visibility: 'visible'
      })),
      state('collapsed', style({
        height: '0',
        opacity: 0,
        visibility: 'hidden'  // Asegura que el contenido no sea interactuable cuando está colapsado
      })),
      transition('expanded <=> collapsed', animate('200ms ease'))
    ]),
    trigger('optionAnimation', [
      state('hide', style({
        opacity: 0,
        transform: 'translateY(-10px)',
        visibility: 'hidden'
      })),
      state('show', style({
        opacity: 1,
        transform: 'translateY(0)',
        visibility: 'visible'
      })),
      transition('hide => show', [
        animate('200ms ease')
      ]),
      transition('show => hide', [
        animate('200ms ease')
      ])
    ])
  ]
})
export class SidebarComponent {
  @Output() toggleExpand = new EventEmitter<boolean>();
  private readonly destroy$ = new Subject<void>();

  isAnimating = false;

  isExpanded = true;
  isAlertsExpanded = false;
  isNotificationsExpanded = false;
  isProfileExpanded = true

  activeMenuOption: string | null = null
  currentMenuItems: MenuItem[] = [];
  isCircularMenuOpen = false;

  menu: MenuSection[] = [
    {
      mainOption: 'Explorar Servicios',
      icon: 'icon-services',
      items: [
        {
          label: 'Aplicaciones',
          options: ['SPAD Line', 'SPAD IoT', 'SPAD Home'],
          isExpanded: false
        },
        {
          label: 'Guías de producto',
          isExpanded: false
        },
        {
          label: 'Tutoriales',
          isExpanded: false
        },
        {
          label: 'Recursos',
          options: ['Recurso A', 'Recurso B', 'Recurso C'],
          isExpanded: false
        }
      ]
    },
    {
      mainOption: 'Dashboard',
      icon: 'icon-WorkSpace',
      items: [
        {
          label: 'Mi Dashboard',
          isExpanded: false
        },
        {
          label: 'SPAD IoT',
          isExpanded: false
        },
        {
          label: 'SPAD Line',
          isExpanded: false
        },
      ]
    },
    {
      mainOption: 'SPAD Process',
      icon: 'icon-spad-process-icon',
      items: [
        {
          label: 'Nuevo proceso',
          isExpanded: false
        },
        {
          label: 'Procedimientos en curso',
          isExpanded: false
        },
        {
          label: 'Historial',
          isExpanded: false
        },
      ]
    },
    {
      mainOption: 'Operador',
      icon: 'icon-operator',
      items: [
        {
          label: 'Contratos',
          isExpanded: false
        },
        {
          label: 'Procesos',
          isExpanded: false
        },
        {
          label: 'Historial',
          isExpanded: false
        },
      ]
    },
    {
      mainOption: 'Auditor',
      icon: 'icon-auditor-icon',
      items: [
        {
          label: 'Mi Dashboard',
          isExpanded: false
        },
        {
          label: 'SPAD IoT',
          isExpanded: false
        },
        {
          label: 'SPAD Line',
          isExpanded: false
        },
      ]
    },
    {
      mainOption: 'Comercial',
      icon: 'icon-comercial_icon',
      items: [
        {
          label: 'Cartera de clientes',
          isExpanded: false
        },
        {
          label: 'Post-venta',
          isExpanded: false
        },
        {
          label: 'Inventarios',
          isExpanded: false
        },
      ]
    }
  ]

  alertsSection: AlertsSection = {
    mainOption: 'Alertas',
    notifications: [
      {
        id: 1,
        date: '16 de noviembre de 2024',
        title: 'Actualización programada',
        content: 'El próximo 18 de noviembre, los servicios de SPAD Line estarán temporalmente deshabilitados.',
        application: 'SPAD Line'
      },
      {
        id: 2,
        date: '17 de noviembre de 2024',
        title: 'Actualización programada',
        content: 'El próximo 20 de diciembre, la interfaz del gráfico de emociones tendrá un nuevo estilo.',
        application: 'SPAD Line'
      },
      {
        id: 3,
        date: '18 de noviembre de 2024',
        title: 'Actualización programada',
        content: 'El próximo 20 de diciembre, la aplicación de SPAD IoT tendrá una nueva funcionalidad.',
        application: 'SPAD IoT'
      },
      {
        id: 4,
        date: '24 de diciembre de 2024',
        title: 'Actualización programada',
        content: 'El próximo 30 de diciembre, se realizará una actualización general de SPAD IoT.',
        application: 'SPAD IoT'
      }
    ]
  }

  notificationsSection: AlertsSection = {
    mainOption: 'Notificaciones',
    notifications: [
      {
        id: 1,
        date: '16 de diciembre de 2024',
        title: 'Nuevos gestos registrados',
        content: 'Hoy se registraron 452 gestos, con mayor frecuencia fue Alegría.',
        application: 'SPAD Line'
      },
    ]
  }

  toggleMenuItem(mainOption: string) {
    if (this.isAnimating) return

    this.isAnimating = true
    this.activeMenuOption = mainOption
    this.isAlertsExpanded = false
    this.isNotificationsExpanded = false
    this.isProfileExpanded = false

    const menuSection = this.menu.find(section => section.mainOption === mainOption)

    if (menuSection) {
      this.currentMenuItems = menuSection.items.map(item => ({
        ...item,
        isExpanded: false
      }))
    }

    if (!this.isExpanded) {
      this.isExpanded = true
    }

    setTimeout(() => {
      this.isAnimating = false
    }, 300)
  }

  toggleCircularMenu() {
    this.isCircularMenuOpen = !this.isCircularMenuOpen;
  }

  toggleSubmenu(index: number) {
    if (!this.isExpanded || this.isAnimating) return;

    this.currentMenuItems = this.currentMenuItems.map((item, i) => ({
      ...item,
      isExpanded: i === index ? !item.isExpanded : false,
    }));
  }

  toggleAlerts() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.activeMenuOption = 'Alertas';
    this.isAlertsExpanded = true
    this.isNotificationsExpanded = false
    this.isProfileExpanded = false
    this.isExpanded = true;

    this.isCircularMenuOpen = false;

    setTimeout(() => {
      this.isAnimating = false
    }, 300)
  }

  toggleNotifications() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.activeMenuOption = 'Notificaciones';
    this.isNotificationsExpanded = true
    this.isAlertsExpanded = false
    this.isProfileExpanded = false
    this.isExpanded = true;

    this.isCircularMenuOpen = false;

    setTimeout(() => {
      this.isAnimating = false
    }, 300)
  }

  toggleProfile() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.activeMenuOption = 'Perfil';
    this.isNotificationsExpanded = false
    this.isAlertsExpanded = false
    this.isProfileExpanded = true
    this.isExpanded = true;

    this.isCircularMenuOpen = false;

    setTimeout(() => {
      this.isAnimating = false
    }, 300)
  }

  closeExpandedBox() {
    if (this.isAnimating) return

    this.isAnimating = true
    this.isExpanded = false
    this.isAlertsExpanded = false
    this.isNotificationsExpanded = false
    this.activeMenuOption = null

    setTimeout(() => {
      this.isAnimating = false
    }, 300)
  }

  removeAlert(id: number) {
    this.alertsSection.notifications = this.alertsSection.notifications.filter(
      notification => notification.id !== id
    )
  }

  clearAllAlerts() {
    this.alertsSection.notifications = []
  }

  removeNotification(id: number) {
    this.notificationsSection.notifications = this.notificationsSection.notifications.filter(
      notification => notification.id !== id
    )
  }

  clearAllNotifications() {
    this.notificationsSection.notifications = []
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
