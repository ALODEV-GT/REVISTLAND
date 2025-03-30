import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';

@Injectable({
    providedIn: 'root',
})
export class LikeService {
    private readonly baseUrl = inject(ApiConfigService).API_MAGAZINES;
    private readonly http = inject(HttpClient);

    userLikedMagazine(id: string) {
        return this.http.get<boolean>(`${this.baseUrl}/${id}/like/check`)
    }

    likeMagazine(id: number) {
        return this.http.post<any>(`${this.baseUrl}/${id}/like`, {})
    }

    unlikeMagazine(id: number) {
        return this.http.delete<any>(`${this.baseUrl}/${id}/like`, {})
    }
}
