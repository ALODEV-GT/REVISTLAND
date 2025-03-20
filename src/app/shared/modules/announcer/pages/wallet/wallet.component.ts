import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WalletService } from '../../services/wallet.service';
import { WalletDto } from '../../models/wallet.interface';
import { ModalMsgComponent } from '../../components/modal-msg/modal-msg.component';

@Component({
  selector: 'app-wallet',
  imports: [FormsModule, ModalMsgComponent],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss'
})
export class WalletComponent {

  //services
  private readonly walletService = inject(WalletService)

  wallet: WalletDto = { balance: 0.00, id: 0 };
  rechargeAmount: number = 0;

  //modals
  @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('modal2') modalRef2!: ElementRef<HTMLDialogElement>;
  @ViewChild('modal3') modalRef3!: ElementRef<HTMLDialogElement>;



  ngOnInit() {
    this.getWalletUser()
  }

  getWalletUser() {
    this.walletService.getWalletByUserId().subscribe({
      next: value => {
        this.wallet = value
      }
    })
  }

  openModal() {
    this.modalRef.nativeElement.showModal();
  }

  closeModal() {
    this.modalRef.nativeElement.close();
  }

  addBalance() {
    if (this.rechargeAmount <= 0) {
      this.modalRef3.nativeElement.showModal();
      return
    }

    this.wallet.balance = this.rechargeAmount;
    this.rechargeAmount = 0;
    this.closeModal();
    this.walletService.updateWallet(this.wallet).subscribe({
      next: value => {
        this.wallet = value;
        this.modalRef2.nativeElement.showModal();
      },
      error: err => {
        this.modalRef3.nativeElement.showModal();
      }
    })

  }
}
