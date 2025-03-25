import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ChargePeriodAdDto } from '@shared/modules/announcer/models/charge-period-ad.interface';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';
import { ConfigurationDto, UpdateCostHidingAdDayDto, UpdateCostMagazineDayDto } from '../models/configuration.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private readonly _http = inject(HttpClient)
  private readonly apiConfigService = inject(ApiConfigService);
  private API_AD = this.apiConfigService.API_ANNOUNCER;
  private API_CONFIG = this.apiConfigService.API_CONFIGURATION;

  constructor() { }

  updateChanrgePeriod(postAd: ChargePeriodAdDto, id: number): Observable<ChargePeriodAdDto> {
    return this._http.put<ChargePeriodAdDto>(`${this.API_AD}/charge-period-ads/${id}`, postAd)
  }

  getConfiguration(): Observable<ConfigurationDto> {
    return this._http.get<ConfigurationDto>(`${this.API_CONFIG}`)
  }

  updateCostHidingAdDayConfiguration(update: UpdateCostHidingAdDayDto, id: number): Observable<UpdateCostHidingAdDayDto> {
    return this._http.put<UpdateCostHidingAdDayDto>(`${this.API_CONFIG}/cost-hidin/${id}`, update)
  }

  updateCostMagazineDayConfiguration(update: UpdateCostMagazineDayDto, id: number): Observable<UpdateCostMagazineDayDto> {
    return this._http.put<UpdateCostMagazineDayDto>(`${this.API_CONFIG}/cost-magazine/${id}`, update)
  }
}
