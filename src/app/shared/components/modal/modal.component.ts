import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';
import { ModalStore } from '../../../store/modal.store';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modalRef!: ElementRef;

  readonly Close = X;

  readonly modalStore = inject(ModalStore);

  content?: { new (): any };

  constructor() {
    effect(async () => {
      const component = await this.modalStore.loadComponent?.()?.();
      if (component) {
        this.content = component;
      }
    });
  }

  ngOnInit() {
    this.modalStore.setModalCallback(() => {
      this.modalRef.nativeElement.showModal();
    });
  }

  ngOnDestroy() {
    this.modalStore.closeModal();
  }
}
