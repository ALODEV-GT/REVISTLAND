import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';
import { WalletDto } from '../models/wallet.interface';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private readonly _http = inject(HttpClient)
  private readonly apiConfigService = inject(ApiConfigService);
  private  readonly API_WALLET = this.apiConfigService.API_WALLET

  constructor() { }

  getWalletByUserId():Observable<WalletDto>{
    return this._http.get<WalletDto>(`${this.API_WALLET}/byUser`)
  }

  updateWallet(wallet:WalletDto): Observable<WalletDto>{
    return this._http.put<WalletDto>(`${this.API_WALLET}/${wallet.id}`, wallet)
  }

}
