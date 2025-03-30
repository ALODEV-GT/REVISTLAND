import { CommonModule } from '@angular/common';
import { Page } from './../../../../../shared/models/Page';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdUser, AdViewCreateDto } from '@shared/modules/editor/models/adUser';
import { Category } from '@shared/modules/editor/models/category.model';
import { AdUserService } from '@shared/modules/editor/services/ad-user.service';
import { CategoryService } from '@shared/modules/editor/services/category.service';
import { MagazineService } from '@shared/modules/editor/services/magazine.service';
import { MagazineItem } from '@subscriber/models/magazine';
import { Heart, LucideAngularModule, Package } from 'lucide-angular';
import { forkJoin } from 'rxjs';
import { SafeUrlPipe } from '@shared/utils/SafeUrlPipe';


import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-home',
  imports: [LucideAngularModule, CommonModule, SafeUrlPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class HomeComponent implements OnInit {
  @ViewChild('recomendedCarousel', { static: false }) recomendedCarousel!: ElementRef;
  readonly categoryService = inject(CategoryService)
  private readonly magazineService = inject(MagazineService)
  private readonly adUserService = inject(AdUserService)
  private readonly router = inject(Router)
  readonly Heart = Heart
  readonly package = Package

  magazineCategory: MagazineItem[] = []
  categorySelected: any
  leftAds: AdUser[] = [];
  rightAds: AdUser[] = [];
  allAds: AdUser[] = [];

  categories: Category[] = []
  newest: MagazineItem[] = []

  swiperParams = {
    slidesPerView: 1,
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
    on: {
      init() {
        console.log("iniciando");
      },
    },
  };

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories
      }
    })

    this.magazineService.getNewestMagazines().subscribe({
      next: (resp: MagazineItem[]) => {
        this.newest = resp
      }
    })

    const adRequests = Array(6).fill(null).map(() => this.adUserService.getRandomAd());
    forkJoin(adRequests).subscribe(ads => {
      this.leftAds = ads.slice(0, 3);
      this.rightAds = ads.slice(3, 6);
      this.allAds = [...this.leftAds, ...this.rightAds];
      // Registrar vistas
      ads.forEach(ad => {
        const view: AdViewCreateDto = { adId: ad.id, urlView: window.location.href };
        this.adUserService.saveView(view).subscribe();
      });
    });
  }

  ngAfterViewInit() {
    const swiperEl = this.recomendedCarousel.nativeElement;

    Object.assign(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: true,
      pagination: { clickable: true },
      loop: false,
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        }
      }
    });

    // Inicializar Swiper
    swiperEl.initialize();
  }

  loadMagazineByCategory(category: any) {
    this.categorySelected = category
    this.magazineCategory = []
    this.magazineService.getMagazineByCategory(category.id).subscribe({
      next: (response: Page<MagazineItem>) => {
        this.magazineCategory = response.content
      }
    })
  }

  seeMagazineDetail(idMagazine: number) {
    this.router.navigate([`rl`, idMagazine])
  }


}
