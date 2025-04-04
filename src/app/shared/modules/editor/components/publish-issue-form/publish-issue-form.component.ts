import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
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
export class PublishIssueFormComponent implements OnChanges {
  private readonly formBuilder = inject(FormBuilder);
  private readonly magazineService = inject(MagazineService);
  private readonly alertStore = inject(AlertStore);

  @Output() return = new EventEmitter<void>();
  @Input() magazine?: MinimalMagazine;

  magazines: MinimalMagazine[] = [];

  creatingIssue = false;

  issueForm: FormGroup = this.formBuilder.group({
    magazineId: [0, [Validators.required, Validators.min(1)]],
    title: ['', [Validators.minLength(3)]],
    pdf: [undefined, [Validators.required]],
  });

  constructor() {
    if (!this.magazine) {
      this.magazineService.getEditorMagazines(false).subscribe((magazines) => {
        this.magazines = magazines;
      });
    }
  }

  ngOnChanges() {
    this.issueForm.get('magazineId')?.patchValue({
      value: this.magazine?.id || 0,
      disabled: !!this.magazine,
    });
  }

  isValid(field: string) {
    return (
      this.issueForm.get(field)?.touched && this.issueForm.get(field)?.valid
    );
  }

  isInvalid(field: string) {
    return (
      this.issueForm.get(field)?.touched && this.issueForm.get(field)?.invalid
    );
  }

  changeFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files?.length) {
      return;
    }
    const file = target.files[0];
    if (file.type !== 'application/pdf' || file.size > 10485760) {
      this.alertStore.addAlert({
        message:
          'El archivo debe ser un archivo PDF de un tamaño inferior a 10MB',
        type: 'error',
      });
      return;
    }
    this.issueForm.get('pdf')?.setValue(file);
  }

  publishIssue() {
    if (this.issueForm.invalid) {
      return;
    }
    const issue = this.issueForm.getRawValue();
    const formData = new FormData();
    formData.append('title', issue.title);
    formData.append('pdf', issue.pdf);
    this.creatingIssue = true;

    this.magazineService.createIssue(issue.magazineId, formData).subscribe({
      next: (issue) => {
        this.creatingIssue = false;
        this.issueForm.reset();
        this.alertStore.addAlert({
          message: `El numero de la revista "${issue.title}" ha sido publicado exitosamente`,
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
