import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdDto } from '@shared/modules/announcer/models/ad-post-dto.interface';
import { TypeAd } from '@shared/modules/announcer/models/type-ad.enum';
import { AnnouncerService } from '@shared/modules/announcer/services/announcer.service';
import { SlugService } from '@shared/modules/announcer/services/slug.service';

@Component({
  selector: 'app-report-ad',
  imports: [],
  templateUrl: './report-ad.component.html',
  styleUrl: './report-ad.component.scss'
})
export class ReportAdComponent {

  private readonly _announcerService = inject(AnnouncerService)
  private readonly slugSevice = inject(SlugService)
  private readonly route = inject(Router)


  @Input() ads!: AdDto[];

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
