import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthPage } from '@shared/modules/auth/models/auth-control-page';
import { AuthService } from '@shared/modules/auth/services/auth.service';
import { Login, Session } from '../../models/auth';
import { AuthStore } from 'app/store/auth.store';
import { AlertStore } from 'app/store/alert.store';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Output() changePage = new EventEmitter<AuthPage>();

  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly store = inject(AuthStore);
  private readonly alertStore = inject(AlertStore);

  errorMessage: string = '';

  showPassword = false;

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(2)]]
  });

  login() {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, ingrese todos los campos';
      return
    }

    const login: Login = this.loginForm.getRawValue();

    this.authService.login(login).subscribe({
      next: (value: Session) => {
        this.store.updateSession(value)
        this.redirect(value.roleName)
      },
      error: (error) => {
        this.handleErrorLogin(error);
      }
    })

  }

  // TODO: redirect to area work
  redirect(role: string) {
    switch (role) {
      case 'EDITOR':
        break
      case 'ADMIN':
        this.router.navigate(['admin/dashboard'])
        break
      case 'USER':
        this.router.navigate(['rl/home'])
        break
      case 'ANNOUNCER':
        this.router.navigate([`${role.toLocaleLowerCase()}/`])
        break;
      default:
        // defult to USER
        this.router.navigate(['rl/home'])
        break;
    }
  }

  handleErrorLogin(error: any) {
    const erroCode: number = error.status
    switch (erroCode) {
      case 401:
        this.alertStore.addAlert({
          message: `Credenciales incorrectas`,
          type: 'error',
        });
        break
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toRegister() {
    this.changePage.emit(AuthPage.REGISTER);
  }

  toFind() {
    this.changePage.emit(AuthPage.FIND);
  }

}
