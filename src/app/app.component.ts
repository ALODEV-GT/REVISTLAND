import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { AuthStore } from './store/auth.store';
import { AlertStore } from './store/alert.store';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly store = inject(AuthStore);
  private readonly localStorageService = inject(LocalStorageService);

  readonly alertStore = inject(AlertStore);

  constructor() {
    effect(() => {
      const session = this.store.session();
      this.localStorageService.saveState({ session });
    });
  }
}
