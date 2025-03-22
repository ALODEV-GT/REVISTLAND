import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ModalState } from './models/modal-store.model';

const initialState: ModalState<any> = {
  loadComponent: undefined,
  openModalCallback: undefined,
};

export const ModalStore = signalStore(
  { providedIn: 'root' },
  withState(() => initialState),
  withMethods((store) => ({
    setModalCallback(openModalCallback: () => void) {
      patchState(store, (state: ModalState<any>) => {
        return { ...state, openModalCallback };
      });
    },
    setComponent<T>(loadComponent: () => Promise<new () => T>) {
      patchState(store, (state: ModalState<T>) => {
        return { ...state, loadComponent };
      });
    },
    openModal() {
      store.openModalCallback?.()?.();
    },
    closeModal() {
      patchState(store, (state: ModalState<any>) => {
        return {
          ...state,
          loadComponent: undefined,
          openModalCallback: undefined,
        };
      });
    },
  }))
);
