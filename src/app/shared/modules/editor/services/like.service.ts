import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';

@Injectable({
    providedIn: 'root',
})
export class LikeService {
    private baseUrl: string;

    constructor(
        private http: HttpClient,
        private apiConfig: ApiConfigService
    ) {
        this.baseUrl = this.apiConfig.API_MAGAZINES;
    }

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
