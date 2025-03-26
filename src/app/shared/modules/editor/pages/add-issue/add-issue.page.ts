import { Component } from '@angular/core';
import { PublishIssueFormComponent } from "../../components/publish-issue-form/publish-issue-form.component";

@Component({
  selector: 'app-add-issue',
  imports: [PublishIssueFormComponent],
  templateUrl: './add-issue.page.html',
  styleUrl: './add-issue.page.scss',
})
export class AddIssuePage {}
