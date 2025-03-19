import { Injectable, inject } from '@angular/core';
import { ChargePeriodAdDto } from '../models/charge-period-ad.interface';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncerService {

  private readonly _http = inject(HttpClient)
  private readonly apiConfigService = inject(ApiConfigService);
  private API_ANNOUNCER = this.apiConfigService.API_ANNOUNCER;


  constructor() { }

  getAllChargePeriodAd(): Observable<ChargePeriodAdDto[]> {
    return this._http.get<ChargePeriodAdDto[]>(`${this.API_ANNOUNCER}/charge-period-ads`)
  }

}
