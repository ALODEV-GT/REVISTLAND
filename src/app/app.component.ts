import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { AlertsComponent } from './shared/components/alerts/alerts.component';
import { AuthStore } from './store/auth.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly store = inject(AuthStore);
  private readonly localStorageService = inject(LocalStorageService);

  constructor() {
    effect(() => {
      const session = this.store.session();
      this.localStorageService.saveState({ session });
    });
  }
}
