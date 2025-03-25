import { Rol, Session } from '@shared/modules/auth/models/auth';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Auth } from './models/auth-store.model';
import { inject } from '@angular/core';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { Router } from '@angular/router';

export const INITIAL_STATE: Auth = {
    session: {
        token: "",
        id: 0,
        username: "",
        email: "",
        profilePicture: "",
        isDeleted: false,
        roleName: Rol.USER,
        firstname: "",
        lastname: "",
    }
};

export const AuthStore = signalStore(
    { providedIn: 'root' },
    withState((localStorageService = inject(LocalStorageService)) => localStorageService.getState()),
    withMethods((store, router = inject(Router), localStorageService = inject(LocalStorageService)) => ({
        updateEmail(email: string) {
            patchState(store, state => ({
                session: {
                    ...state.session,
                    email
                }
            }));
        },
        updateSession(session: Session) {
            patchState(store, { session });
            localStorageService.saveState({ session });
        },
        logout() {
            patchState(store, INITIAL_STATE);
            localStorageService.saveState(INITIAL_STATE);
            router.navigate(['/welcome']);
        }
    }))
);