import { Component, inject } from '@angular/core';
import { AuthStore } from 'app/store/auth.store';

@Component({
  selector: 'editor-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  authStore = inject(AuthStore);
}
