import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthStore } from "app/store/auth.store";

export const authGuard: CanActivateFn = (route, state) => {
    const store = inject(AuthStore);

    if (store.session.token()) {
        return true
    }
    store.logout()
    return true
}