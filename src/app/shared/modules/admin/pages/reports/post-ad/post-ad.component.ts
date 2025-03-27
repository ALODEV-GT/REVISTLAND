import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdReportDto, PostAdReportTotal } from '@shared/modules/admin/models/reports/earnings.interface';
import { ReportService } from '@shared/modules/admin/services/report.service';

@Component({
  selector: 'app-post-ad',
  imports: [FormsModule],
  templateUrl: './post-ad.component.html',
  styleUrl: './post-ad.component.scss'
})
export class PostAdComponent {

  private readonly _reportService = inject(ReportService)
  report: AdReportDto[] = [];
  totalAdPost: number = 0;

  startDate = '';
  endDate = '';
  type: number = 0;

  ngOnInit(){
    //this.getReportEarnings()
  }

  formatDateTime(date: any): string {
    const parsedDate = date instanceof Date ? date : new Date(date);
    return parsedDate.toISOString().split('T')[0] + ' ' + parsedDate.toTimeString().slice(0, 5) + ' hrs';
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

  getReport(){
    this.type = Number(this.type)
    if (this.startDate === '' || this.endDate === '') {
      this._reportService.getReportPostAd(this.type).subscribe({
        next: value =>{
          this.report = value.adReportDto
          this.totalAdPost = value.totalAdPost
        }
      })
      return;
    }
    this._reportService.getReportPostAd(this.type,this.startDate, this.endDate).subscribe({
      next: value =>{
        this.report = value.adReportDto
        this.totalAdPost = value.totalAdPost
      }
    })
  }


}
