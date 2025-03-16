import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from './store/auth.store';
import { LocalStorageService } from '@shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly store = inject(AuthStore);
  private readonly localStorageService = inject(LocalStorageService);

  constructor() {
    effect(() => {
      const email = this.store.email()
      const accessToken = this.store.accessToken()
      this.localStorageService.saveState({ email, accessToken });
    });
  }
}
