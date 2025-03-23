import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { AlertsComponent } from './shared/components/alerts/alerts.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { AuthStore } from './store/auth.store';
import { ModalStore } from './store/modal.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertsComponent, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  readonly modalStore = inject(ModalStore);

}
