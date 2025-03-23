export interface Alert {
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface Alerts {
  alerts: Alert[];
}
