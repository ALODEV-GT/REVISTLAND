import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Alert, Alerts as AlertState } from './models/alert-store.model';

const initialState: AlertState = { alerts: [] };

export const AlertStore = signalStore(
  { providedIn: 'root' },
  withState(() => initialState),
  withMethods((store) => {
    const removeAlert = () => {
      patchState(store, (state: AlertState) => {
        state.alerts.shift();
        return { ...state };
      });
    };
    const addAlert = (alert: Alert) => {
      patchState(store, (state: AlertState) => {
        setTimeout(() => {
          removeAlert();
        }, 15000);

        if (state.alerts.length > 4) {
          removeAlert();
        }

        return {
          ...state,
          alerts: [...state.alerts, alert],
        };
      });
    };
    return {
      removeAlert,
      addAlert,
    };
  })
);
