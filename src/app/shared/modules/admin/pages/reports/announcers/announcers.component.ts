import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnnouncersDto } from '@shared/modules/admin/models/announcer.interface';
import { PaymentPostAdPerAnnouncerDto } from '@shared/modules/admin/models/reports/announcers.interface';
import { ReportService } from '@shared/modules/admin/services/report.service';
import { AnnouncerService } from '@shared/modules/announcer/services/announcer.service';

@Component({
  selector: 'app-announcers',
  imports: [FormsModule],
  templateUrl: './announcers.component.html',
  styleUrl: './announcers.component.scss'
})
export class AnnouncersComponent {

  private readonly _announcerService = inject(AnnouncerService)
  private readonly _reportService = inject(ReportService)
  announcersDto: AnnouncersDto[] = []
  report: PaymentPostAdPerAnnouncerDto[] = []
  totalAdPost: number = 0;


  startDate = '';
  endDate = '';
  idAdvertiser = 0;



  ngOnInit() {
    this.getAllAnnouncers()
  }


  getReport() {
    this.idAdvertiser = Number(this.idAdvertiser)
    if (this.idAdvertiser <= 0) {
      //reporte sin filtro de anunciador
      this.getReportByRange()
      return
    }

    this.getReportByRangeAdnIdAdvertiser()



  }

  getReportByRangeAdnIdAdvertiser(){
    if (this.startDate === '' || this.endDate === '') {
      
      this._reportService.getReportPostAdAnnuncersById(this.idAdvertiser).subscribe({
        next: value =>{
          this.report = value.paymentPostAdPerAnnouncerDtos
          this.totalAdPost = value.totalAdPost

        }
      })
      return
    }

    this._reportService.getReportPostAdAnnuncersById(this.idAdvertiser, this.startDate, this.endDate).subscribe({
      next: value =>{
        this.report = value.paymentPostAdPerAnnouncerDtos
        this.totalAdPost = value.totalAdPost

      }
    })
  }

  getReportByRange(){
    if (this.startDate === '' || this.endDate === '') {
      
      this._reportService.getReportPostAdAnnuncers().subscribe({
        next: value =>{
          this.report = value.paymentPostAdPerAnnouncerDtos
          this.totalAdPost = value.totalAdPost
        }
      })
      return
    }

    this._reportService.getReportPostAdAnnuncers(this.startDate, this.endDate).subscribe({
      next: value =>{
        this.report = value.paymentPostAdPerAnnouncerDtos
        this.totalAdPost = value.totalAdPost

      }
    })
  }

  getAllAnnouncers() {
    this._announcerService.getAllAnnouncers().subscribe({
      next: value => {
        this.announcersDto = value
      }
    })
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


}
