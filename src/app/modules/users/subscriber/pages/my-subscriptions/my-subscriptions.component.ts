import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '@shared/modules/editor/services/category.service';
import { MagazineService } from '@shared/modules/editor/services/magazine.service';
import { MagazineItem } from '@subscriber/models/magazine';
import { Heart, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-my-subscriptions',
  imports: [LucideAngularModule],
  templateUrl: './my-subscriptions.component.html',
  styleUrl: './my-subscriptions.component.scss'
})
export default class MySubscriptionsComponent implements OnInit {
  readonly Heart = Heart
  readonly categoryService = inject(CategoryService)
  private readonly magazineService = inject(MagazineService)
  private readonly router = inject(Router)
  magazines: MagazineItem[] = []

  ngOnInit(): void {
    this.magazineService.getUserMagazines().subscribe({
      next: (resp: MagazineItem[]) => {
        this.magazines = resp
      }
    })
  }

  seeMagazineDetail(idMagazine: number) {
    this.router.navigate([`rl`, idMagazine])
  }

}
