import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthPage } from '@shared/modules/auth/models/auth-control-page';
import { AuthService } from '@shared/services/auth.service';
import { Register } from '../../models/auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @Output() changePage = new EventEmitter<AuthPage>();

  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService)
  showPassword = false;
  errorMessage: string = '';

  registerForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  register() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, ingrese todos los campos';
      return
    }

    const register: Register = this.registerForm.getRawValue();

    this.authService.register(register).subscribe({
      next: () => {
        this.changePage.emit(AuthPage.CONFIRMATION);
      },
      error: (error) => {
        this.handlerErrorRegister(error);
      }
    })
  }

  handlerErrorRegister(error: any) {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toLogin() {
    this.changePage.emit(AuthPage.LOGIN);
  }
}
