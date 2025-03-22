import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AlertStore } from '../../../store/alert.store';

@Component({
  selector: 'app-alerts',
  imports: [CommonModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss',
})
export class AlertsComponent {
  readonly alertStore = inject(AlertStore);
}
