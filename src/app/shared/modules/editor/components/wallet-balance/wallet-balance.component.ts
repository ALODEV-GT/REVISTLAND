import { CommonModule } from '@angular/common';
import { Component, inject, OnChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Wallet } from '@editor/models/wallet.model';
import { WalletService } from '@editor/services/wallet.service';
import { AlertStore } from 'app/store/alert.store';
import { LucideAngularModule, Plus, X } from 'lucide-angular';

@Component({
  selector: 'editor-wallet-balance',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './wallet-balance.component.html',
  styleUrl: './wallet-balance.component.scss',
})
export class WalletBalanceComponent implements OnChanges {
  private readonly formBuilder = inject(FormBuilder);
  private readonly walletService = inject(WalletService);
  private readonly alertStore = inject(AlertStore);

  readonly Recharge = Plus;
  readonly Cancel = X;

  formOpen: boolean = false;
  wallet?: Wallet;
  walletForm = this.formBuilder.group({
    amount: ['', [Validators.required, Validators.min(1)]],
  });

  constructor() {
    this.ngOnChanges();
  }

  ngOnChanges(): void {
    this.walletService.getWallet().subscribe({
      next: (wallet) => {
        this.wallet = wallet;
      },
    });
  }

  toggleForm() {
    this.formOpen = !this.formOpen;
    this.walletForm.reset();
  }

  updateWallet() {
    if (this.walletForm.invalid || !this.wallet) {
      return;
    }
    this.alertStore.addAlert({
      message: 'Accediendo a cuenta bancaria...',
      type: 'info',
    });
    const balance = +this.walletForm.getRawValue().amount!;
    this.walletService.updateWallet({ ...this.wallet, balance }).subscribe({
      next: (wallet) => {
        this.wallet = wallet;
        this.walletForm.reset();
        this.formOpen = false;
        this.alertStore.addAlert({
          message: 'El saldo se ha actualizado correctamente',
          type: 'success',
        });
      },
      error: () => {
        this.alertStore.addAlert({
          message: 'Error al actualizar el saldo',
          type: 'error',
        });
      },
    });
  }
}
