export interface ModalState<T> {
  loadComponent?: () => Promise<new () => T>;
  openModalCallback?: () => void;
}
