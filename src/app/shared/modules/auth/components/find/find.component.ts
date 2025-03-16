import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthPage } from '@shared/modules/auth/models/auth-control-page';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-find',
  imports: [ReactiveFormsModule],
  templateUrl: './find.component.html',
  styleUrl: './find.component.scss'
})
export class FindComponent {
  @Output() changePage = new EventEmitter<AuthPage>();

  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  errorMessage: string = '';

  findForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });


  find() {
    this.errorMessage = '';

    if (this.findForm.invalid) {
      this.errorMessage = 'Por favor, ingrese un correo valido';
      return
    }

    const email: string = this.findForm.value.email

    //TODO: Consume api endpoint
    this.toRecover();
  }

  handleErrorFind(error: any) {

  }

  toLogin() {
    this.changePage.emit(AuthPage.LOGIN);
  }

  toRecover() {
    this.changePage.emit(AuthPage.RECOVER);
  }
}
