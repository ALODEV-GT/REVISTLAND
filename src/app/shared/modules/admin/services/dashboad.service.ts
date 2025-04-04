import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { TotalTarjetDto, topEditor } from '../models/total-tarjets.interface';
import { Observable } from 'rxjs';
import { PostAdMount } from '@shared/modules/announcer/models/ad-post-dto.interface';
import { CountRegisterByRolDto } from '../models/count-register-by-role.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboadService {

  private readonly _http = inject(HttpClient)
  private readonly apiConfigService = inject(ApiConfigService);
  private API_AD = this.apiConfigService.API_ANNOUNCER;
  private API_MAGAZINE = this.apiConfigService.API_MAGAZINES;
  private API_REPORT = this.apiConfigService.API_REPORT;
  private API_ADMIN = this.apiConfigService.API_ADMIN;


  constructor() { }

  getTotolPost(startDate?: string, endDate?: string): Observable<TotalTarjetDto>{
    let params = new HttpParams();
  
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);

    return this._http.get<TotalTarjetDto>(`${this.API_AD}/total-post-ad`,  { params });
  }

  getTotalMagazinesPost(startDate?: string, endDate?: string): Observable<TotalTarjetDto>{
    let params = new HttpParams();
  
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);

    return this._http.get<TotalTarjetDto>(`${this.API_AD}/total-post-ad`,  { params });
  }

  getTopEditor(startDate?: string, endDate?: string): Observable<topEditor>{
    let params = new HttpParams();
  
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);

    return this._http.get<topEditor>(`${this.API_MAGAZINE}/top-editor`,  { params });
  }

  getTopPublisherAd(startDate?: string, endDate?: string): Observable<topEditor>{
    let params = new HttpParams();
  
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);

    return this._http.get<topEditor>(`${this.API_AD}/top-ad-publisher`,  { params });
  }

  getAdCountsByMonth(startDate?: string, endDate?: string): Observable<PostAdMount[]>{
    let params = new HttpParams();
  
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);

    return this._http.get<PostAdMount[]>(`${this.API_AD}/count-by-month`,  { params });
  }

  getMagazineCountsByMonth(startDate?: string, endDate?: string): Observable<PostAdMount[]>{
    let params = new HttpParams();
  
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);

    return this._http.get<PostAdMount[]>(`${this.API_MAGAZINE}/count-by-month`,  { params });
  }

  getCountByRole(startDate?: string, endDate?: string): Observable<CountRegisterByRolDto[]>{
    let params = new HttpParams();
  
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);

    return this._http.get<CountRegisterByRolDto[]>(`${this.API_REPORT}/count-by-role`,  { params });
  }

  getRegisterUsers(startDate?: string, endDate?: string): Observable<PostAdMount[]>{
    let params = new HttpParams();
  
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);

    return this._http.get<PostAdMount[]>(`${this.API_ADMIN}/total-registers-month`,  { params });
  }


}
