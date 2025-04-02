import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { AdUser, AdViewCreateDto } from '../models/adUser';

@Injectable({
    providedIn: 'root',
})
export class AdUserService {
    private readonly baseUrl = inject(ApiConfigService).API_ANNOUNCER;
    private readonly http = inject(HttpClient);

    getRandomAd() {
        return this.http.get<AdUser>(`${this.baseUrl}/random`)
    }

    saveView(view: AdViewCreateDto) {
        return this.http.post<AdViewCreateDto>(`${this.baseUrl}/views`, view)
    }
}
