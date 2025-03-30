import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Profile } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    private readonly baseUrl = inject(ApiConfigService).API_PROFILE;
    private readonly http = inject(HttpClient);

    getProfile(idUser: string) {
        return this.http.get<Profile>(`${this.baseUrl}/${idUser}/profile`)
    }

    updateProfile(profile: Profile) {
        return this.http.put<Profile>(`${this.baseUrl}/${profile.user.id}/profile`, profile)
    }
}
