import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ChargePeriodAdDto } from '@shared/modules/announcer/models/charge-period-ad.interface';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';
import { ConfigurationDto, UpdateCostHidingAdDayDto, UpdateCostMagazineDayDto } from '../models/configuration.interface';
import { MagazineAdminDto, UpdateCostMagazineDto } from '../models/magazineDto.interface';
import { AnnouncersDto } from '../models/announcer.interface';
import { EarningsReport, PostAdReportTotal } from '../models/reports/earnings.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private readonly _http = inject(HttpClient)
  private readonly apiConfigService = inject(ApiConfigService);
  private API_AD = this.apiConfigService.API_ANNOUNCER;
  private API_CONFIG = this.apiConfigService.API_CONFIGURATION;
  private API_ADMIN = this.apiConfigService.API_ADMIN;
  private API_REPORT = this.apiConfigService.API_REPORT;

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

  getAllMagazinesWithParams(costNull: boolean, editorId: number, asc: boolean): Observable<MagazineAdminDto[]> {
    let params = new HttpParams()
      .set('costNull', costNull.toString())  
      .set('editorId', editorId.toString()) 
      .set('asc', asc.toString());           
  
    return this._http.get<MagazineAdminDto[]>(`${this.API_ADMIN}/magazines`, { params });
  }
  

  updateCostPerDayMagazine(update: UpdateCostMagazineDto, id: number): Observable<UpdateCostMagazineDto> {
    return this._http.put<UpdateCostMagazineDto>(`${this.API_ADMIN}/${id}`, update)
  }

  getAllEditors(): Observable<AnnouncersDto[]> {
    return this._http.get<AnnouncersDto[]>(`${this.API_ADMIN}/all-editors`);
  }

  getReportEarnings(startDate?: string, endDate?: string): Observable<EarningsReport>{
    let params = new HttpParams();
  
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);

    return this._http.get<EarningsReport>(`${this.API_REPORT}/earnings-total`,  { params })
  }

  getReportPostAd(type:number, startDate?: string, endDate?: string): Observable<PostAdReportTotal>{
    let params = new HttpParams();
  
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    params = params.set('type', type);

    return this._http.get<PostAdReportTotal>(`${this.API_REPORT}/post-ad-total`,  { params })
  }
  



}
