import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthPage } from '@shared/modules/auth/models/auth-control-page';
import { AuthService } from '@shared/modules/auth/services/auth.service';
import { Login } from '../../models/auth';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { Auth } from 'app/store/models/auth-store.model';

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
  private readonly localStorageService = inject(LocalStorageService);


  errorMessage: string = '';

  showPassword = false;

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  login() {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, ingrese todos los campos';
      return
    }

    const login: Login = this.loginForm.getRawValue();

    this.authService.login(login).subscribe({
      next: (value) => {
        const auth: Auth = { accessToken: value.token, email: value.email, role: value.roleName }
        this.localStorageService.saveState(auth)    
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

  handleErrorLogin(error: any) {

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
