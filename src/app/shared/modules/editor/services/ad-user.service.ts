import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { AdUser, AdViewCreateDto } from '../models/adUser';
import { map, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AdUserService {
    private readonly baseUrl = inject(ApiConfigService).API_ANNOUNCER;
    private readonly http = inject(HttpClient);

    getRandomAd() {
        return this.http.get<AdUser>(`${this.baseUrl}/random`).pipe(
            tap((ad: AdUser) => {
                if (ad.changePeriodAd.adType == "VIDEO") {
                    ad.videoUrl = this.getYouTubeId(ad.videoUrl);
                }
                return ad
            }
            ))
    }

    saveView(view: AdViewCreateDto) {
        return this.http.post<AdViewCreateDto>(`${this.baseUrl}/views`, view)
    }

    getYouTubeId(url: string): string | '' {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : '';
    }
}
