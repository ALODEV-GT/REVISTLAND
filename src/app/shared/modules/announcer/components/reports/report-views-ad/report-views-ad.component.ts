import { Component, Input, SimpleChanges } from '@angular/core';
import { AdDto, AdViewReportDto, ViewAdDto } from '@shared/modules/announcer/models/ad-post-dto.interface';
import { TypeAd } from '@shared/modules/announcer/models/type-ad.enum';

@Component({
  selector: 'app-report-views-ad',
  imports: [],
  templateUrl: './report-views-ad.component.html',
  styleUrl: './report-views-ad.component.scss'
})
export class ReportViewsAdComponent {

  @Input() ads!: AdViewReportDto[];
  total = 0;
  details = false;
  adDetail: ViewAdDto[] = [];



  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.ads?.length > 0) {
      this.total = 0;
      this.calcularTotal()
    }
  }


  getEnumValue(type: string): TypeAd | undefined {
    return TypeAd[type as keyof typeof TypeAd];
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

  formatDateTime(date: any): string {
    const dateString = `${date}`
    const [datePart, timePart] = dateString.split('T');
    const time = timePart.slice(0, 5);

    return `${datePart} ${time} hrs`;
  }

  calcularTotal(){
    this.ads.forEach(ad =>{
      this.total += ad.viewsAdDto.length;
    })
  }

  viewDeataildAd(ad:AdViewReportDto){
    this.details = true
    this.adDetail = ad.viewsAdDto;
  }

  noDetails(){
    this.details = false;
  }


}
