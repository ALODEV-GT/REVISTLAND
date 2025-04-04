import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '@shared/modules/editor/services/category.service';
import { MagazineService } from '@shared/modules/editor/services/magazine.service';
import { MagazineItem } from '@subscriber/models/magazine';
import { Heart, LucideAngularModule } from 'lucide-angular';
import { AdUserService } from '@shared/modules/editor/services/ad-user.service';
import { AdUser, AdViewCreateDto } from '@shared/modules/editor/models/adUser';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'app-my-subscriptions',
  imports: [LucideAngularModule, CommonModule, YouTubePlayerModule],
  templateUrl: './my-subscriptions.component.html',
  styleUrl: './my-subscriptions.component.scss'
})
export default class MySubscriptionsComponent implements OnInit {
  readonly Heart = Heart;
  readonly categoryService = inject(CategoryService);
  private readonly magazineService = inject(MagazineService);
  private readonly router = inject(Router);
  private readonly adUserService = inject(AdUserService);
  magazines: MagazineItem[] = [];
  leftAds: AdUser[] = [];
  rightAds: AdUser[] = [];
  allAds: AdUser[] = [];

  playerVars = {
    autoplay: 1,
    loop: 1,
    modestbranding: 1,
    mute: 1,
    showinfo: 0,
    rel: 0
  };

  ngOnInit(): void {
    this.magazineService.getUserMagazines().subscribe({
      next: (resp: MagazineItem[]) => {
        this.magazines = resp;
      }
    });

    const adRequests = Array(8).fill(null).map(() => this.adUserService.getRandomAd());
    forkJoin(adRequests).subscribe(ads => {
      this.leftAds = ads.slice(0, 3);
      this.rightAds = ads.slice(3, 6);
      this.allAds = ads.slice(6, 8);
      ads.forEach(ad => {
        const view: AdViewCreateDto = { adId: ad.id, urlView: window.location.href };
        this.adUserService.saveView(view).subscribe();
      });
    });
  }

  seeMagazineDetail(idMagazine: number) {
    this.router.navigate([`rl`, idMagazine]);
  }

  
}