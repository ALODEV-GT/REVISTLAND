import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Issue } from '../models/magazine.model';

@Injectable({
    providedIn: 'root',
})
export class IssuesService {
    private readonly baseUrl = inject(ApiConfigService).API_MAGAZINES;
    private readonly http = inject(HttpClient);

    getIssues(idMagazine: number) {
        return this.http.get<Issue[]>(`${this.baseUrl}/${idMagazine}/issues`)
    }

}
