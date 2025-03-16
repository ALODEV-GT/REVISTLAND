import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthPage } from '@shared/modules/auth/models/auth-control-page';
import { AuthService } from '@shared/services/auth.service';
import { Recover } from '../../models/auth';

@Component({
  selector: 'app-recover',
  imports: [ReactiveFormsModule],
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.scss'
})
export class RecoverComponent {
  @Output() changePage = new EventEmitter<AuthPage>();

  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  errorMessage: string = '';

  showPassword = false;

  recoverForm: FormGroup = this.formBuilder.group({
    code: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  recover() {
    this.errorMessage = '';

    if (this.recoverForm.invalid) {
      this.errorMessage = 'Por favor, ingrese todos los campos';
      return
    }

    const recover: Recover = this.recoverForm.getRawValue();

    //TODO: Consume api endpoint

  }

  handleErrorLogin(error: any) {

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toFind() {
    this.changePage.emit(AuthPage.FIND);
  }
}
