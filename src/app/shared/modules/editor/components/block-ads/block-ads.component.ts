import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MagazineService } from '@editor/services/magazine.service';
import { WalletService } from '@editor/services/wallet.service';
import { AlertStore } from 'app/store/alert.store';

@Component({
  selector: 'editor-block-ads',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './block-ads.component.html',
  styleUrl: './block-ads.component.scss',
})
export class BlockAdsComponent implements OnChanges {
  private readonly magazineService = inject(MagazineService);
  private readonly walletService = inject(WalletService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly alertStore = inject(AlertStore);

  @Input() magazineId!: number;

  expirationDate: Date | null = null;
  costPerDay: number | null = null;
  currentBalance: number | null = null;
  blockAdsForm = this.formBuilder.group({
    expirationDate: ['', [Validators.required]],
  });

  chargingData = false;
  updatingMagazine = false;

  constructor() {
    this.ngOnChanges();
  }

  ngOnChanges() {
    this.chargingData = true;
    this.walletService.getAdCost().subscribe((cost) => {
      this.costPerDay = cost.costHidingAdDay;
    });

    this.walletService.getWallet().subscribe((wallet) => {
      this.currentBalance = wallet.balance;
    });

    this.magazineService
      .getEditorMagazine(this.magazineId)
      .subscribe((magazine) => {
        this.chargingData = false;
        if (!magazine.adBlockingExpirationDate) {
          this.expirationDate = null;
          this.blockAdsForm.patchValue({
            expirationDate: '',
          });
          return;
        }
        this.expirationDate = new Date(magazine.adBlockingExpirationDate);
        this.blockAdsForm.patchValue({
          expirationDate: magazine.adBlockingExpirationDate,
        });
      });
  }

  blockAds() {
    if (!this.blockAdsForm.valid) {
      return;
    }
    const expirationDate = this.blockAdsForm.getRawValue().expirationDate!;
    if (this.expirationDate && new Date(expirationDate) <= this.expirationDate) {
      this.alertStore.addAlert({
        message: 'La fecha de expiración debe ser mayor a la actual',
        type: 'error',
      });
      return;
    }
    if (new Date(expirationDate) <= new Date()) {
      this.alertStore.addAlert({
        message: 'La fecha de expiración debe ser mayor a la fecha actual',
        type: 'error',
      });
      return;
    }
    this.updatingMagazine = true;
    this.magazineService
      .updateAdBlockingExpirationDate(this.magazineId, expirationDate)
      .subscribe({
        next: (magazine) => {
          this.updatingMagazine = false;
          this.ngOnChanges();
          this.alertStore.addAlert({
            message: `La revista "${magazine.title}" ha sido mejorada exitosamente`,
            type: 'success',
          });
        },
        error: (err) => {
          this.updatingMagazine = false;
          if (err.message.includes('No hay suficientes fondos')) {
            this.alertStore.addAlert({
              message: 'No hay suficientes fondos para mejorar la revista',
              type: 'error',
            });
            return;
          }
          this.alertStore.addAlert({
            message:
              'La revista no ha podido ser mejorada, revisa la información ingresada',
            type: 'error',
          });
          console.error(err);
        },
      });
  }
}
