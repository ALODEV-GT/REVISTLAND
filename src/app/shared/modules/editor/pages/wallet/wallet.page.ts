import { Component } from '@angular/core';
import { WalletBalanceComponent } from "../../components/wallet-balance/wallet-balance.component";

@Component({
  selector: 'app-wallet',
  imports: [WalletBalanceComponent],
  templateUrl: './wallet.page.html',
  styleUrl: './wallet.page.scss'
})
export class WalletPage {

}
