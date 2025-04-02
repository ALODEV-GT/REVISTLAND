import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '@shared/modules/editor/models/user';
import { ProfileService } from '@shared/modules/editor/services/profile.service';
import { AuthStore } from 'app/store/auth.store';
import { Heart, LucideAngularModule, PenLine, User } from 'lucide-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [LucideAngularModule, CommonModule, ReactiveFormsModule]
})
export default class ProfileComponent implements OnInit {
  readonly PenLine = PenLine;
  readonly User = User;
  readonly Heart = Heart;
  private readonly store = inject(AuthStore);
  allowEdit: boolean = false
  formBuilder = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  profileService = inject(ProfileService);

  profile: Profile | null = null;
  isEditing = false;
  originalProfile: Profile | null = null;

  profileForm = this.formBuilder.group({
    description: ['', [Validators.required, Validators.minLength(2)]],
    hobbies: ['', [Validators.required, Validators.minLength(2)]],
    interestsTopics: ['', [Validators.required, Validators.minLength(2)]]
  });

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.allowEdit = this.store.session().id.toString() == id
    this.profileService.getProfile(id).subscribe({
      next: (resp: Profile) => {
        this.profile = resp;
        this.originalProfile = { ...resp };
        this.updateFormValues();
      },
      error: (err) => console.error('Error loading profile:', err)
    });
  }

  enableEdit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    if (this.originalProfile) {
      this.profile = { ...this.originalProfile };
      this.updateFormValues();
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid || !this.profile) return;

    const updatedProfile: Profile = {
      ...this.profile,
      description: this.profileForm.get('description')?.value || '',
      hobbies: this.profileForm.get('hobbies')?.value || '',
      interestsTopics: this.profileForm.get('interestsTopics')?.value || ''
    };

    this.profileService.updateProfile(updatedProfile).subscribe({
      next: (resp: Profile) => {
        this.profile = resp;
        this.originalProfile = { ...resp };
        this.isEditing = false;
      },
      error: (err) => console.error('Error updating profile:', err)
    });
  }

  updateFormValues(): void {
    this.profileForm.patchValue({
      description: this.profile?.description,
      hobbies: this.profile?.hobbies,
      interestsTopics: this.profile?.interestsTopics
    });
  }

  getHobbies(): string[] {
    return this.profile?.hobbies?.split(',').map(h => h.trim()) || [];
  }

  getInterests(): string[] {
    return this.profile?.interestsTopics?.split(',').map(i => i.trim()) || [];
  }
}