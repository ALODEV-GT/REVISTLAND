import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Auth } from './models/auth-store.model';
import { inject } from '@angular/core';
import { LocalStorageService } from '@shared/services/local-storage.service';

export const INITIAL_STATE: Auth = {
    accessToken: '',
    email: '',
    role: ''
};

export const AuthStore = signalStore(
    { providedIn: 'root' },
    withState((localStorageService = inject(LocalStorageService)) => localStorageService.getState()),
    withMethods((store) => ({
        changeEmail(email: string): void {
            patchState(store, (state) => ({ ...state, email }));
        }
    }))
);