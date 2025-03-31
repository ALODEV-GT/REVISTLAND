import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CostBlockAds, Wallet } from '@editor/models/wallet.model';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private readonly walletBaseUrl = inject(ApiConfigService).API_WALLET;
  private readonly confBaseUrl = inject(ApiConfigService).API_CONFIGURATION;
  private readonly http = inject(HttpClient);

  getAdCost(): Observable<CostBlockAds> {
    return this.http.get<CostBlockAds>(`${this.confBaseUrl}`);
  }

  getWallet(): Observable<Wallet> {
    return this.http.get<Wallet>(`${this.walletBaseUrl}/byUser`);
  }

  updateWallet(balance: Wallet): Observable<Wallet> {
    return this.http.put<Wallet>(
      `${this.walletBaseUrl}/${balance.id}`,
      balance
    );
  }
}
