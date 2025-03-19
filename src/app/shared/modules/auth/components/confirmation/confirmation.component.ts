import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthPage } from '@shared/modules/auth/models/auth-control-page';
import { AuthService } from '@shared/modules/auth/services/auth.service';
import { Confirmation } from '../../models/auth';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { Auth } from 'app/store/models/auth-store.model';

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
  private readonly localStorageService = inject(LocalStorageService);

  errorMessage: string = '';

  confirmationForm: FormGroup = this.formBuilder.group({
    code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
  });


  confirm() {
    this.errorMessage = '';

    if (this.confirmationForm.invalid) {
      this.errorMessage = 'Por favor, ingrese el codigo de confirmación';
      return
    }

    const emailUser: string = localStorage.getItem("email_confirm") || "";
    const confirmation: Confirmation = this.confirmationForm.getRawValue();
    confirmation.email = emailUser;

    this.authService.confirmation(confirmation).subscribe({
      next: (value) => {
        const auth: Auth = { accessToken: value.token, email: value.email, role: value.roleName }
        this.localStorageService.saveState(auth)        
        this.redirect(value.roleName)
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
