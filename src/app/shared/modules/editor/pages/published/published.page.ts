import { Component, effect, inject } from '@angular/core';
import { FlatMagazine } from '@editor/models/magazine.model';
import { MagazineService } from '@editor/services/magazine.service';
import { MagazineCardComponent } from '@editor/components/magazine-card/magazine-card.component';

@Component({
  selector: 'editor-published',
  imports: [MagazineCardComponent],
  templateUrl: './published.page.html',
  styleUrl: './published.page.scss',
})
export class PublishedPage {
  private readonly magazineService = inject(MagazineService);

  magazines: FlatMagazine[] = [];

  constructor() {
    effect(() => {
      this.magazineService.getEditorMagazines().subscribe((magazines) => {
        this.magazines = magazines;
      });
    });
  }
}
