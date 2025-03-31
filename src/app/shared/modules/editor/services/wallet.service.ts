import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Wallet } from '@editor/models/wallet.model';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private readonly baseUrl = inject(ApiConfigService).API_WALLET;
  private readonly http = inject(HttpClient);

  getWallet(): Observable<Wallet> {
    return this.http.get<Wallet>(`${this.baseUrl}/byUser`);
  }

  updateWallet(balance: Wallet): Observable<Wallet> {
    return this.http.put<Wallet>(`${this.baseUrl}/${balance.id}`, balance);
  }
}
