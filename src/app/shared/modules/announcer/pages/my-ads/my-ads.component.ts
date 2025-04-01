import { Component, inject } from '@angular/core';
import { AdDto } from '../../models/ad-post-dto.interface';
import { AnnouncerService } from '../../services/announcer.service';
import { TypeAd } from '../../models/type-ad.enum';
import { SlugService } from '../../services/slug.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-ads',
  imports: [],
  templateUrl: './my-ads.component.html',
  styleUrl: './my-ads.component.scss'
})
export class MyAdsComponent {

  //services
  private readonly _announcerService = inject(AnnouncerService)
  private readonly slugSevice = inject(SlugService)
  private readonly route = inject(Router)

  ads: AdDto[] = [];

  ngOnInit() {
    this.getAllMyAds()
  }

  getAllMyAds() {
    this._announcerService.getAllMyAds().subscribe({
      next: value => {
        this.ads = value
      }
    })
  }


  editAd(ad: AdDto) {
    this._announcerService.ad = ad;
    const slug = this.slugSevice.generateSlug(ad.createdAt.toString());
    this.route.navigate([`announcer/edit-ad/${slug}`]);
  }

  getEnumValue(type: string): TypeAd | undefined {
    return TypeAd[type as keyof typeof TypeAd];
  }

  formatDateTime(date: any): string {
    const dateString = `${date}`
    const [datePart, timePart] = dateString.split('T');
    const time = timePart.slice(0, 5);

    return `${datePart} ${time} hrs`;
  }

  conversWeek(daysDuration: number): string {
    if (daysDuration < 7) {
      return `${daysDuration} dia${daysDuration > 1 ? 's' : ''}`;
    }

    const weeks = Math.floor(daysDuration / 7);
    const remainingDays = daysDuration % 7;

    if (remainingDays === 0) {
      return `${weeks} semana${weeks > 1 ? 's' : ''}`;
    }

    return `${weeks} semana${weeks > 1 ? 's' : ''} y ${remainingDays} día${remainingDays > 1 ? 's' : ''}`;
  }

  activeSting(active: boolean) {
    return active ? 'Si' : 'No';
  }


}
