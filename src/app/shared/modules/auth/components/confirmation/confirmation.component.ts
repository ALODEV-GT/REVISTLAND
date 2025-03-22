import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthPage } from '@shared/modules/auth/models/auth-control-page';
import { AuthService } from '@shared/modules/auth/services/auth.service';
import { Confirmation, Session } from '../../models/auth';
import { AuthStore } from 'app/store/auth.store';

@Component({
  selector: 'app-confirmation',
  imports: [ReactiveFormsModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {
  @Output() changePage = new EventEmitter<AuthPage>();
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly store = inject(AuthStore);

  errorMessage: string = '';

  confirmationForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
  });

  constructor() {
    const email: string = this.store.session.email()
    if (!email) {
      this.toLogin()
    }

    this.confirmationForm.patchValue({ email })
  }

  confirm() {
    this.errorMessage = '';

    if (this.confirmationForm.invalid) {
      this.errorMessage = 'Por favor, ingrese el codigo de confirmación';
      return
    }

    const confirmation: Confirmation = this.confirmationForm.getRawValue();

    this.authService.confirmation(confirmation).subscribe({
      next: (response: Session) => {
        this.store.updateSession(response)
        this.redirect(response.roleName)
      },
      error: (error) => {
        this.handleErrorConfirmation(error);
      }
    })
  }

  // TODO: redirect to area work
  redirect(role: string) {
    switch (role) {
      case 'EDITOR':

        break;

      case 'ADMIN':

        break;
      case 'USER':

        break;

      case 'ANNOUNCER':
        this.router.navigate(['announcer/'])
        break;

      default:
        // defult to USER
        this.router.navigate(['suscriptor/'])
        break;
    }
  }

  // TODO: manage error
  handleErrorConfirmation(error: any) {

  }

  toLogin() {
    this.changePage.emit(AuthPage.LOGIN);
  }
}
