import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category } from '@editor/models/category.model';
import { EditMagazine } from '@editor/models/magazine.model';
import { Tag } from '@editor/models/tag.model';
import { CategoryService } from '@editor/services/category.service';
import { MagazineService } from '@editor/services/magazine.service';
import { TagService } from '@editor/services/tag.service';
import { AlertStore } from 'app/store/alert.store';
import { ModalStore } from 'app/store/modal.store';
import { LucideAngularModule, Minus, Plus } from 'lucide-angular';

@Component({
  selector: 'editor-edit-form',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss',
})
export class EditFormComponent implements OnChanges {
  private readonly formBuilder = inject(FormBuilder);
  private readonly magazineService = inject(MagazineService);
  private readonly categoryService = inject(CategoryService);
  private readonly tagService = inject(TagService);
  private readonly alertStore = inject(AlertStore);
  private readonly modalStore = inject(ModalStore);

  readonly Add = Plus;
  readonly Remove = Minus;

  @Input() magazineId!: number;

  categories: Category[] = [];
  tags: Tag[] = [];

  selectedTags: Tag[] = [];
  unselectedTags: Tag[] = [];
  updatingMagazine = false;
  chargingData = false;

  magazineForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.minLength(3)]],
    description: ['', [Validators.minLength(3)]],
    categoryId: [0, [Validators.min(1)]],
    tagIds: [[], [Validators.minLength(1)]],
    disableLikes: [false],
    disableComments: [false],
    disableSuscriptions: [false],
  });

  constructor() {
    this.tagService.getTags().subscribe((tags) => {
      this.tags = tags;
    });

    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  ngOnChanges() {
    this.chargingData = true;
    this.magazineService
      .getEditorMagazine(this.magazineId)
      .subscribe((magazine) => {
        this.magazineForm.patchValue({
          ...magazine,
        });

        this.selectedTags = magazine.tagIds
          .map((id) => this.tags.find((t) => t.id === id))
          .filter((t): t is Tag => !!t?.id);

        this.unselectedTags = this.tags.filter(
          (t) => !this.selectedTags.includes(t)
        );
        this.chargingData = false;
      });
  }

  editIssues() {
    this.modalStore.openModal(
      () =>
        import('@editor/pages/published-issues/published-issues.page').then(
          (m) => m.PublishedIssuesPage
        ),
      { magazineId: this.magazineId }
    );
  }

  toggleTag(tag: Tag) {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter((t) => t.id !== tag.id);
      this.unselectedTags.push(tag);
    } else {
      this.unselectedTags = this.unselectedTags.filter((t) => t.id !== tag.id);
      this.selectedTags.push(tag);
    }
    this.magazineForm
      .get('tagIds')
      ?.setValue(this.selectedTags.map((t) => t.id));
  }

  editMagazine() {
    if (this.updatingMagazine) {
      return;
    }
    const magazine: EditMagazine = this.magazineForm.getRawValue();
    this.updatingMagazine = true;
    this.magazineService.updateMagazine(this.magazineId, magazine).subscribe({
      next: (magazine) => {
        this.updatingMagazine = false;
        this.ngOnChanges();
        this.alertStore.addAlert({
          message: `La revista "${magazine.title}" ha sido editada exitosamente`,
          type: 'success',
        });
      },
      error: (err) => {
        this.updatingMagazine = false;
        this.alertStore.addAlert({
          message:
            'La revista no ha podido ser editada, revisa la información ingresada',
          type: 'error',
        });
        console.error(err);
      },
    });
  }
}
