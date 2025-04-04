import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthPage } from '@shared/modules/auth/models/auth-control-page';
import { AuthService } from '@shared/modules/auth/services/auth.service';
import { Register } from '../../models/auth';
import { RoleDto } from '../../models/role.interface';
import { AuthStore } from 'app/store/auth.store';
import { AlertStore } from 'app/store/alert.store';

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
  private readonly store = inject(AuthStore);
  private readonly alertStore = inject(AlertStore);


  showPassword = false;
  errorMessage: string = '';

  roles: RoleDto[] = [];

  registerForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    firstname: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    roleId: [0, [Validators.required]]
  });

  ngOnInit() {
    this.authService.getRolesRegister().subscribe({
      next: value => {
        this.roles = value
      }
    })
  }

  register() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, ingrese todos los campos';
      return
    }

    const register: Register = this.registerForm.getRawValue();

    register.roleId = Number(register.roleId)

    this.authService.register(register).subscribe({
      next: () => {
        this.store.updateEmail(register.email)
        this.changePage.emit(AuthPage.CONFIRMATION);
      },
      error: (error) => {
        this.handlerErrorRegister(error);
      }
    })
  }

  handlerErrorRegister(error: any) {
    const erroCode: number = error.error.status
    switch (erroCode) {
      case 409:
        this.alertStore.addAlert({
          message: `El correo electronico ya esta en uso`,
          type: 'error',
        });
        break
      case 500:
        this.alertStore.addAlert({
          message: `El nombre de usuario ya esta en uso`,
          type: 'error',
        });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toLogin() {
    this.changePage.emit(AuthPage.LOGIN);
  }

  getRoleForVista(role: string): string {
    switch (role) {
      case 'EDITOR':
        return 'Publicar Revistas';

      case 'USER':
        return 'Leer Revistas y Suscribirme';

      case 'ANNOUNCER':
        return 'Publicar Anuncios en la plataforma';

      default:
        return '';
    }
  }
}
