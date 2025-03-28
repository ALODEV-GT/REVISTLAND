import { Injectable } from "@angular/core";
import { environment } from "@environment/environment.development";

@Injectable({
    providedIn: 'root'
})
export class ApiConfigService {
    private readonly API_BASE = environment.API_ROOT;

    /**announcers */
    API_AUTH = `${this.API_BASE}/auth`;
    API_ANNOUNCER = `${this.API_BASE}/ads`;
    API_PAYMENT = `${this.API_BASE}/payments`
    API_WALLET = `${this.API_BASE}/wallets`;
    API_ROLE = `${this.API_BASE}/roles`

    /* Magazines */
    API_MAGAZINES = `${this.API_BASE}/magazines`;
    API_CATEGORIES = `${this.API_BASE}/categories`;
    API_TAGS = `${this.API_BASE}/tags`;

    /* reports admin*/
    API_REPORT = `${this.API_BASE}/reports`
    API_ADMIN = `${this.API_BASE}/admin`
    API_EXPORT = `${this.API_ADMIN}/exports`

    /*Configurations */
    API_CONFIGURATION = `${this.API_BASE}/configurations`

}