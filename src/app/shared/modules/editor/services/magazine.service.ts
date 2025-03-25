import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';
import { NewMagazine } from '../models/magazine.model';

@Injectable({
  providedIn: 'root',
})
export class MagazineService {
  private readonly baseUrl = inject(ApiConfigService).API_MAGAZINES;
  private readonly http = inject(HttpClient);

  constructor() {}

  createMagazine(magazine: NewMagazine): Observable<MinimalMagazine> {
    return this.http.post<MinimalMagazine>(this.baseUrl, magazine);
  }

  createIssue(formData: FormData): Observable<void> {
    return this.http.post<void>(this.baseUrl + '/issue', formData);
  }
}
