import { Injectable } from "@angular/core";
import { AuthPage } from "@shared/modules/auth/models/auth-control-page";

@Injectable({
    providedIn: 'root'
})
export class AuthControlPageService {
    selectedPage: AuthPage = AuthPage.LOGIN;

    changePage(page: AuthPage) {
        this.selectedPage = page;
    }
}