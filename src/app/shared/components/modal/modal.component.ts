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
import { ModalStore } from 'app/store/modal.store';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit, OnDestroy {
  private readonly modalStore = inject(ModalStore);

  readonly Close = X;

  @ViewChild('modal') modalRef!: ElementRef;

  content?: { new (): unknown };
  inputs?: Record<string, unknown>;

  constructor() {
    effect(async () => {});
  }

  ngOnInit() {
    this.modalStore.setModalCallback(async (loadComponent, inputs) => {
      this.inputs = inputs;
      this.content = await loadComponent();
      this.modalRef.nativeElement.showModal();
    });
  }

  ngOnDestroy() {
    this.modalStore.setModalCallback(undefined);
  }
}
