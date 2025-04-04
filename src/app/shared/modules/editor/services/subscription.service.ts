import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';

@Injectable({
    providedIn: 'root',
})
export class SubscriptionService {
    private readonly baseUrl = inject(ApiConfigService).API_MAGAZINES;
    private readonly http = inject(HttpClient);

    userSubscribedMagazine(id: string) {
        return this.http.get<boolean>(`${this.baseUrl}/${id}/subscribed`)
    }

    subscribeMagazine(id: number) {
        return this.http.post<any>(`${this.baseUrl}/${id}/subscribe`, {})
    }

    unsubscribeMagazine(id: number) {
        return this.http.delete<any>(`${this.baseUrl}/${id}/subscribe`, {})
    }
}
