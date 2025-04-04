import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthStore } from 'app/store/auth.store';

@Component({
  selector: 'editor-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly router = inject(Router);
  readonly authStore = inject(AuthStore);

  goProfile() {
    const id = this.authStore.session().id.toString();
    this.router.navigate([`profile/${id}`]);
    this.authStore.session().firstname;
  }

  getProfileImage() {
    return `
      ${this.authStore.session().firstname.charAt(0) || 'X'}${
      this.authStore.session().lastname.charAt(0) || 'X'
    }
    `.toUpperCase();
  }
}
