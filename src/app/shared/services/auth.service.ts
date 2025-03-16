import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Confirmation, Login, Register } from "@shared/modules/auth/models/auth";
import { ApiConfigService } from "@shared/services/api-config.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly apiConfigService = inject(ApiConfigService);
    private readonly http = inject(HttpClient);

    constructor() { }

    login(login: Login) {
        return this.http.post(`${this.apiConfigService.API_AUTH}/sign-in`, login);
    }

    register(register: Register) {
        return this.http.post(`${this.apiConfigService.API_AUTH}/sign-up`, register);
    }

    confirmation(confirmation: Confirmation) {
        return this.http.put(`${this.apiConfigService.API_AUTH}/sign-up`, confirmation);
    }
}