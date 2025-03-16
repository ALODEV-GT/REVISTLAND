import { Component, ViewChild } from '@angular/core';
import { TopbarComponent } from '@shared/modules/auth/components/topbar/topbar.component';
import { AuthDialogComponent } from "@shared/modules/auth/components/auth-dialog/auth-dialog.component";

@Component({
  selector: 'app-landing',
  imports: [TopbarComponent, AuthDialogComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export default class LandingComponent {
  @ViewChild(AuthDialogComponent) loginComponent!: AuthDialogComponent;

  onTopbarLoginClick() {
    this.loginComponent.openModal();
  }
}
