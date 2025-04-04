import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthPage } from './../../models/auth-control-page';
import { AuthControlPageService } from '../../services/auth-control-page.service';
import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { RecoverComponent } from '../recover/recover.component';
import { FindComponent } from '../find/find.component';

@Component({
  selector: 'app-auth-dialog',
  imports: [
    LoginComponent,
    RegisterComponent,
    ConfirmationComponent,
    FindComponent,
    RecoverComponent
  ],
  templateUrl: './auth-dialog.component.html',
  styleUrl: './auth-dialog.component.scss'
})
export class AuthDialogComponent {
  @ViewChild('authDialog') loginElementRef!: ElementRef;
  @Output() changePage = new EventEmitter<void>();

  readonly authControlPageService = inject(AuthControlPageService)

  onChangePage(page: AuthPage) {
    this.authControlPageService.changePage(page);
  }

  openModal() {
    this.loginElementRef.nativeElement.showModal();
  }

  openLoginModal() {
    this.changePage.emit();
  }
}
