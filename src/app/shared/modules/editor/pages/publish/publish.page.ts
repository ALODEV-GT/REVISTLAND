import { Component } from '@angular/core';
import { PublishFormComponent } from '@editor/components/publish-form/publish-form.component';
import { PublishIssueFormComponent } from '@editor/components/publish-issue-form/publish-issue-form.component';
import { MinimalMagazine } from '@editor/models/magazine.model';

@Component({
  selector: 'editor-publish',
  imports: [PublishFormComponent, PublishIssueFormComponent],
  templateUrl: './publish.page.html',
  styleUrl: './publish.page.scss',
})
export class PublishPage {
  magazine?: MinimalMagazine;

  setMagazine(magazine?: MinimalMagazine) {
    this.magazine = magazine;
  }
}
