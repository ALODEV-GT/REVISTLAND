import { Component } from '@angular/core';
import { PublishFormComponent } from "../../components/magazine-form/publish-form.component";

@Component({
  selector: 'editor-publish',
  imports: [PublishFormComponent],
  templateUrl: './publish.page.html',
  styleUrl: './publish.page.scss'
})
export class PublishPage {

}
