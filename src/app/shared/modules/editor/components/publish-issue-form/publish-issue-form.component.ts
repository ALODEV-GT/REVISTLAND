import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MinimalMagazine } from '@editor/models/magazine.model';
import { MagazineService } from '@editor/services/magazine.service';
import { AlertStore } from 'app/store/alert.store';

@Component({
  selector: 'editor-publish-issue-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './publish-issue-form.component.html',
  styleUrl: './publish-issue-form.component.scss',
})
export class PublishIssueFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly magazineService = inject(MagazineService);
  private readonly alertStore = inject(AlertStore);

  @Output() return = new EventEmitter<void>();
  @Input() magazine?: MinimalMagazine;

  magazines: MinimalMagazine[] = [];

  creatingIssue = false;

  issueForm: FormGroup = this.formBuilder.group({
    magazineId: [0, [Validators.required, Validators.min(0)]],
    pdf: [undefined, [Validators.required]],
  });

  constructor() {
    if (!this.magazine) {
      this.magazineService.getEditorMagazines().subscribe((magazines) => {
        this.magazines = magazines;
      });
    }
  }

  changeMagazine(magazine: MinimalMagazine) {
    this.magazine = magazine;
  }

  changeFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files?.length) {
      return;
    }
    const file = target.files[0];
    if (file.type !== 'application/pdf') {
      return;
    }
    this.issueForm.get('pdf')?.setValue(file);
  }

  publishIssue() {
    const issue = this.issueForm.getRawValue();
    const formData = new FormData();
    formData.append('pdf', issue.pdf);
    formData.append('magazineId', issue.magazineId.toString());
    this.creatingIssue = true;

    this.magazineService.createIssue(formData).subscribe({
      next: () => {
        this.creatingIssue = false;
        this.issueForm.reset();
        this.alertStore.addAlert({
          message: `El numero de la revista "${this.magazine?.title}" ha sido publicado exitosamente`,
          type: 'success',
        });
        this.return.emit();
      },
      error: (err) => {
        this.creatingIssue = false;
        this.alertStore.addAlert({
          message:
            'El numero de la revista no ha podido ser publicado, revisa la información ingresada',
          type: 'error',
        });
        console.error(err);
      },
    });
  }
}
