import { Injectable } from "@angular/core";
import { environment } from "@environment/environment.development";

@Injectable({
    providedIn: 'root'
})
export class ApiConfigService {
    private readonly API_BASE = environment.API_ROOT;

    API_AUTH = `${this.API_BASE}/auth`;
    API_ANNOUNCER = `${this.API_BASE}/announcers`;
    API_PAYMENT = `${this.API_BASE}/payments`
    API_WALLET = `${this.API_BASE}/wallets`;
    API_ROLE = `${this.API_BASE}/roles`
    

}