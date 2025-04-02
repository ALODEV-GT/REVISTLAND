import { Component, inject, ViewChild } from '@angular/core';
import { TopbarComponent } from '@shared/modules/auth/components/topbar/topbar.component';
import { AuthDialogComponent } from "@shared/modules/auth/components/auth-dialog/auth-dialog.component";
import { AuthStore } from 'app/store/auth.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [TopbarComponent, AuthDialogComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export default class LandingComponent {
  @ViewChild(AuthDialogComponent) loginComponent!: AuthDialogComponent;
  private readonly store = inject(AuthStore);
  private readonly router = inject(Router);

  constructor() {
    if (this.store.session().token) {
      this.redirect(this.store.session().roleName)
    }
  }

  onTopbarLoginClick() {
    this.loginComponent.openModal();
  }

  redirect(role: string) {
    switch (role) {
      case 'EDITOR':
      case 'ADMIN':
      case 'ANNOUNCER':
        this.router.navigate([`${role.toLocaleLowerCase()}/`])
        break;
      default:
        this.router.navigate(['rl/home'])
        break;
    }
  }
}
