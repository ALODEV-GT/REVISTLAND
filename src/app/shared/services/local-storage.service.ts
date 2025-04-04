import { INITIAL_STATE } from './../../store/auth.store';
import { Injectable } from "@angular/core";
import { Auth } from "app/store/models/auth-store.model";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private readonly KY_STORE: string = 'revistland-store';

    saveState(state: Auth) {
        localStorage.setItem(this.KY_STORE, JSON.stringify(state));
    }

    getState(): Auth {
        const state = localStorage.getItem(this.KY_STORE);
        return state ? JSON.parse(state) : INITIAL_STATE;
    }
}