import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthPage } from '@shared/modules/auth/models/auth-control-page';
import { Recover } from '../../models/auth';
import { AuthStore } from 'app/store/auth.store';

@Component({
  selector: 'app-recover',
  imports: [ReactiveFormsModule],
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.scss'
})
export class RecoverComponent {
  @Output() changePage = new EventEmitter<AuthPage>();
  private readonly store = inject(AuthStore);

  private readonly formBuilder = inject(FormBuilder);

  errorMessage: string = '';

  showPassword = false;

  recoverForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor() {
    const email: string = this.store.session.email()
    if (!email) {
      this.toFind();
    }

    this.recoverForm.patchValue({ email })
  }

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
