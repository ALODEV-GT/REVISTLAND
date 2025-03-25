import { Injectable, inject } from '@angular/core';
import { ChargePeriodAdDto } from '../models/charge-period-ad.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';
import { AdDto, AdPostDto, AdViewReportDto, CountAdByTypeDto, PostAdMount, TotalAdsDto, TotalAmountMoth, TotalViewsAdDto, updateAd } from '../models/ad-post-dto.interface';
import { AnnouncersDto } from '@shared/modules/admin/models/announcer.interface';

@Injectable({
  providedIn: 'root'
})
export class AnnouncerService {

  private readonly _http = inject(HttpClient)
  private readonly apiConfigService = inject(ApiConfigService);
  private API_ANNOUNCER = this.apiConfigService.API_ANNOUNCER;
  private API_PAYMENT = this.apiConfigService.API_PAYMENT;
  ad!: AdDto


  constructor() { }

  getAllChargePeriodAd(): Observable<ChargePeriodAdDto[]> {
    return this._http.get<ChargePeriodAdDto[]>(`${this.API_ANNOUNCER}/charge-period-ads`)
  }

  createAd(postAd: AdPostDto): Observable<AdDto> {
    return this._http.post<AdDto>(`${this.API_ANNOUNCER}`, postAd)
  }

  getAllMyAds(): Observable<AdDto[]> {
    return this._http.get<AdDto[]>(`${this.API_ANNOUNCER}/my-ads`);
  }

  desactiveAnnouncer(postAd: AdPostDto, id: number): Observable<AdDto> {
    return this._http.put<AdDto>(`${this.API_ANNOUNCER}/deactivate/${id}`, postAd)
  }

  activetedAnnouncer(postAd: AdPostDto, id: number): Observable<AdDto> {
    return this._http.put<AdDto>(`${this.API_ANNOUNCER}/activated/${id}`, postAd)
  }

  updateAD(postAd: updateAd, id: number): Observable<AdDto> {
    return this._http.put<AdDto>(`${this.API_ANNOUNCER}/${id}`, postAd)
  }

  getTotalAdUser(): Observable<TotalAdsDto>{
    return this._http.get<TotalAdsDto>(`${this.API_ANNOUNCER}/count-ads-userId`);
  }

  getTotalAdViewsUser(): Observable<TotalViewsAdDto>{
    return this._http.get<TotalViewsAdDto>(`${this.API_ANNOUNCER}/views/total`);
  }

  getPostCountMount(): Observable<PostAdMount[]>{
    return this._http.get<PostAdMount[]>(`${this.API_ANNOUNCER}/post-count-mount`);
  }

  getCountViewsMount(): Observable<PostAdMount[]>{
    return this._http.get<PostAdMount[]>(`${this.API_ANNOUNCER}/views/views-count-mount`);
  }

  getTotalAmountMoth(): Observable<TotalAmountMoth[]>{
    return this._http.get<TotalAmountMoth[]>(`${this.API_PAYMENT}/investment`);
  }

  getAllPostAdMountType(): Observable<CountAdByTypeDto[]> {
    return this._http.get<CountAdByTypeDto[]>(`${this.API_ANNOUNCER}/charge-period-ads/post-month`)
  }

  getReportViewsAd(startDate?: string, endDate?: string): Observable<AdViewReportDto[]> {
    let params = new HttpParams();
  
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
  
    return this._http.get<AdViewReportDto[]>(`${this.API_ANNOUNCER}/views/report-views`, { params });
  }

  getAllMyAdsReport(startDate?: string, endDate?: string): Observable<AdDto[]> {
    let params = new HttpParams();
  
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    
    return this._http.get<AdDto[]>(`${this.API_ANNOUNCER}/my-ads-active`,  { params });
  }

  getAllAds(): Observable<AdDto[]> {
    return this._http.get<AdDto[]>(`${this.API_ANNOUNCER}/all-ads`);
  }

  getAllAdsByUserId(id:number): Observable<AdDto[]> {
    return this._http.get<AdDto[]>(`${this.API_ANNOUNCER}/all-ads/${id}`);
  }

  getAllAnnouncers(): Observable<AnnouncersDto[]> {
    return this._http.get<AnnouncersDto[]>(`${this.API_ANNOUNCER}/all-announcers`);
  }
  
  
}
