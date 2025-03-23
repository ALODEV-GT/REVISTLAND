import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthPage } from '@shared/modules/auth/models/auth-control-page';
import { AuthStore } from 'app/store/auth.store';

@Component({
  selector: 'app-find',
  imports: [ReactiveFormsModule],
  templateUrl: './find.component.html',
  styleUrl: './find.component.scss'
})
export class FindComponent {
  @Output() changePage = new EventEmitter<AuthPage>();
  private readonly store = inject(AuthStore);
  private readonly formBuilder = inject(FormBuilder);

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
    this.store.updateEmail(email);

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
