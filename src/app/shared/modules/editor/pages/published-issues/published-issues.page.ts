import { Component, inject, Input, OnChanges } from '@angular/core';
import { IssueCardComponent } from '@editor/components/issue-card/issue-card.component';
import { MagazineIssue } from '@editor/models/magazine-issue.model';
import { MagazineService } from '@editor/services/magazine.service';
import { ModalStore } from 'app/store/modal.store';

@Component({
  selector: 'editor-published-issues',
  imports: [IssueCardComponent],
  templateUrl: './published-issues.page.html',
  styleUrl: './published-issues.page.scss',
})
export class PublishedIssuesPage implements OnChanges {
  private readonly magazineService = inject(MagazineService);
  private readonly modalStore = inject(ModalStore);

  @Input() magazineId!: number;

  issues: MagazineIssue[] = [];

  ngOnChanges() {
    this.magazineService
      .getMagazineIssues(this.magazineId)
      .subscribe((issues) => {
        this.issues = issues;
      });
  }

  goBack() {
    this.modalStore.openModal(
      () =>
        import('@editor/components/edit-form/edit-form.component').then(
          (m) => m.EditFormComponent
        ),
      { magazineId: this.magazineId }
    );
  }
}
