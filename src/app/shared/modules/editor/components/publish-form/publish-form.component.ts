import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category } from '@editor/models/category.model';
import { MinimalMagazine, NewMagazine } from '@editor/models/magazine.model';
import { Tag } from '@editor/models/tag.model';
import { CategoryService } from '@editor/services/category.service';
import { MagazineService } from '@editor/services/magazine.service';
import { TagService } from '@editor/services/tag.service';
import { AlertStore } from 'app/store/alert.store';
import { LucideAngularModule, Minus, Plus } from 'lucide-angular';

@Component({
  selector: 'editor-publish-form',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './publish-form.component.html',
  styleUrl: './publish-form.component.scss',
})
export class PublishFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly magazineService = inject(MagazineService);
  private readonly categoryService = inject(CategoryService);
  private readonly tagService = inject(TagService);

  readonly Add = Plus;
  readonly Remove = Minus;

  readonly alertStore = inject(AlertStore);

  @Output() publish = new EventEmitter<MinimalMagazine>();

  categories: Category[] = [];
  tags: Tag[] = [];

  selectedTags: Tag[] = [];
  unselectedTags: Tag[] = [];
  creatingMagazine = false;

  magazineForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    categoryId: [0, [Validators.required, Validators.min(1)]],
    tagIds: [[], [Validators.required, Validators.minLength(1)]],
    adBlockingExpirationDate: [''],
    adBlock: [false],
    disableLikes: [false],
    disableComments: [false],
    disableSuscriptions: [false],
  });

  constructor() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.tagService.getTags().subscribe((tags) => {
      this.tags = tags;
      this.unselectedTags = tags;
    });
  }

  isValid(field: string) {
    if (field === 'tagIds') {
      return this.selectedTags.length > 0;
    }
    return (
      this.magazineForm.get(field)?.touched &&
      this.magazineForm.get(field)?.valid
    );
  }

  isInvalid(field: string) {
    if (field === 'tagIds') {
      return this.selectedTags.length === 0;
    }
    return (
      this.magazineForm.get(field)?.touched &&
      this.magazineForm.get(field)?.invalid
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
      ?.patchValue(this.selectedTags.map((t) => t.id));
  }

  publishMagazine() {
    if (this.magazineForm.invalid) {
      return;
    }
    const magazine: NewMagazine = this.magazineForm.getRawValue();
    if (!this.magazineForm.get('adBlock')?.value) {
      magazine.adBlockingExpirationDate = '';
    }
    this.creatingMagazine = true;
    this.magazineService.createMagazine(magazine).subscribe({
      next: (magazine) => {
        this.creatingMagazine = false;
        this.magazineForm.reset();
        this.selectedTags = [];
        this.unselectedTags = this.tags;
        this.alertStore.addAlert({
          message: `La revista "${magazine.title}" ha sido creada exitosamente`,
          type: 'success',
        });
        this.publish.emit(magazine);
      },
      error: (err) => {
        this.creatingMagazine = false;
        this.alertStore.addAlert({
          message:
            'La revista no ha podido ser creada, revisa la información ingresada',
          type: 'error',
        });
        console.error(err);
      },
    });
  }
}
