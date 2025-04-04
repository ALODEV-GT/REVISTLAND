import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthStore } from "app/store/auth.store";

export const authGuard: CanActivateFn = (route, state) => {
    const store = inject(AuthStore);
    const router = inject(Router);

    if (store.session?.token()) {
        if (route.data['role'] && store.session.roleName() !== route.data['role']) {
            router.navigate([`/${store.session.roleName().toLocaleLowerCase()}`]);
        }
        return true
    }
    store.logout()
    return true
}