import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';
import { NewMagazine } from '../models/magazine.model';
import { Page } from '@shared/models/Page';
import { MagazineItem } from '@subscriber/models/magazine';

@Injectable({
  providedIn: 'root',
})
export class MagazineService {
  private readonly baseUrl = inject(ApiConfigService).API_MAGAZINES;
  private readonly http = inject(HttpClient);

  constructor() { }

  createMagazine(magazine: NewMagazine): Observable<void> {
    return this.http.post<void>(this.baseUrl, magazine);
  }

  getMagazineByCategory(idCategory: number) {
    const params = new HttpParams()
      .set("idCategory", idCategory)
    return this.http.get<Page<MagazineItem>>(`${this.baseUrl}`, { params })
  }

  getMagazine(id: string) {
    return this.http.get<MagazineItem>(`${this.baseUrl}/${id}`)
  }

  getUserMagazines() {
    return this.http.get<MagazineItem[]>(`${this.baseUrl}/my-subscriptions`)
  }

  getNewestMagazines() {
    return this.http.get<MagazineItem[]>(`${this.baseUrl}/newest`)
  }
}
