import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FlatMagazine } from '@editor/models/magazine.model';
import { MagazineService } from '@editor/services/magazine.service';
import { AlertStore } from 'app/store/alert.store';
import { ModalStore } from 'app/store/modal.store';
import {
  Banknote,
  CalendarArrowUp,
  ExternalLink,
  Eye,
  Files,
  Heart,
  LucideAngularModule,
  MessagesSquare,
  Pencil,
  Tags,
  Trash2,
  TriangleAlert,
} from 'lucide-angular';

@Component({
  selector: 'editor-magazine-card',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './magazine-card.component.html',
  styleUrl: './magazine-card.component.scss',
})
export class MagazineCardComponent {
  private readonly magazineService = inject(MagazineService);
  private readonly alertStore = inject(AlertStore);
  private readonly modalStore = inject(ModalStore);

  readonly Tags = Tags;
  readonly PublishedAt = CalendarArrowUp;
  readonly Unapproved = TriangleAlert;
  readonly Price = Banknote;
  readonly Issues = Files;
  readonly Likes = Heart;
  readonly Comments = MessagesSquare;
  readonly Follow = Eye;
  readonly Details = ExternalLink;
  readonly Edit = Pencil;
  readonly Delete = Trash2;

  @Input() magazine!: FlatMagazine;

  editMagazine() {
    this.modalStore.openModal(
      () =>
        import('@editor/components/edit-form/edit-form.component').then(
          (m) => m.EditFormComponent
        ),
      { magazineId: this.magazine.id }
    );
  }

  deleteMagazine() {
    this.magazineService.deleteMagazine(this.magazine.id).subscribe({
      next: () => {
        this.alertStore.addAlert({
          message: `La revista "${this.magazine.title}" ha sido eliminado exitosamente`,
          type: 'success',
        });
      },
      error: (err) => {
        this.alertStore.addAlert({
          message:
            'La revista no ha podido ser eliminado, revisa la información ingresada',
          type: 'error',
        });
        console.error(err);
      },
    });
  }
}
