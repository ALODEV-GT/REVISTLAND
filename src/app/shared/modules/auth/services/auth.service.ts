import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Confirmation, Login, Register, Session } from "@shared/modules/auth/models/auth";
import { ApiConfigService } from "@shared/services/api-config.service";
import { Observable } from "rxjs";
import { RoleDto } from "../models/role.interface";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly apiConfigService = inject(ApiConfigService);
    private readonly http = inject(HttpClient);

    constructor() { }

    login(login: Login): Observable<Session> {
        return this.http.post<Session>(`${this.apiConfigService.API_AUTH}/sign-in`, login);
    }

    register(register: Register): Observable<Register> {
        return this.http.post<Register>(`${this.apiConfigService.API_AUTH}/sign-up`, register);
    }

    confirmation(confirmation: Confirmation): Observable<Session> {
        return this.http.put<Session>(`${this.apiConfigService.API_AUTH}/sign-up`, confirmation);
    }

    getRolesRegister(): Observable<RoleDto[]> {
        return this.http.get<RoleDto[]>(`${this.apiConfigService.API_ROLE}`)
    }
}