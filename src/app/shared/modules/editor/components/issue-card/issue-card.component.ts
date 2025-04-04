import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MagazineIssue,
  MinimalMagazineIssue,
} from '@editor/models/magazine-issue.model';
import { MagazineService } from '@editor/services/magazine.service';
import { AlertStore } from 'app/store/alert.store';
import {
  Ban,
  CircleCheck,
  LucideAngularModule,
  Pencil,
  Trash2,
} from 'lucide-angular';

@Component({
  selector: 'editor-issue-card',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './issue-card.component.html',
  styleUrl: './issue-card.component.scss',
})
export class IssueCardComponent implements OnChanges {
  private readonly formBuilder = inject(FormBuilder);
  private readonly magazineService = inject(MagazineService);
  private readonly alertStore = inject(AlertStore);

  readonly Edit = Pencil;
  readonly Confirm = CircleCheck;
  readonly Delete = Trash2;
  readonly Cancel = Ban;

  @Input() issue!: MagazineIssue;

  updatingIssue = false;
  activeEdit = false;

  issueForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.minLength(3)]],
  });

  ngOnChanges() {
    this.issueForm.get('title')?.patchValue(this.issue.title);
  }

  cancelEdit() {
    this.activeEdit = false;
  }

  deleteIssue() {
    this.magazineService
      .deleteIssue(this.issue.magazineId, this.issue.id)
      .subscribe({
        next: () => {
          this.ngOnChanges();
          this.alertStore.addAlert({
            message: `El numero de la revista "${this.issue.title}" ha sido eliminado exitosamente`,
            type: 'success',
          });
        },
        error: (err) => {
          this.alertStore.addAlert({
            message:
              'El numero de la revista no ha podido ser eliminado, revisa la información ingresada',
            type: 'error',
          });
          console.error(err);
        },
      });
  }

  editIssue() {
    if (!this.activeEdit) {
      this.activeEdit = true;
      return;
    }
    if (this.issueForm.invalid) {
      return;
    }
    const issue: MinimalMagazineIssue = this.issueForm.getRawValue();
    this.updatingIssue = true;
    this.magazineService
      .updateIssue(this.issue.magazineId, this.issue.id, issue)
      .subscribe({
        next: (issue) => {
          this.updatingIssue = false;
          this.activeEdit = false;
          this.issue = issue;
          this.ngOnChanges();
          this.alertStore.addAlert({
            message: `El numero "${issue.title}" ha sido editada exitosamente`,
            type: 'success',
          });
        },
        error: (err) => {
          this.updatingIssue = false;
          this.alertStore.addAlert({
            message:
              'El numero no ha podido ser editado, revisa la información ingresada',
            type: 'error',
          });
          console.error(err);
        },
      });
  }
}
