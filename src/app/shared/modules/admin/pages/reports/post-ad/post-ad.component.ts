import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdReportDto, PostAdReportTotal } from '@shared/modules/admin/models/reports/earnings.interface';
import { ExportService } from '@shared/modules/admin/services/export.service';
import { ReportService } from '@shared/modules/admin/services/report.service';
import { ModalMsgComponent } from '@shared/modules/announcer/components/modal-msg/modal-msg.component';

@Component({
  selector: 'app-post-ad',
  imports: [FormsModule, ModalMsgComponent],
  templateUrl: './post-ad.component.html',
  styleUrl: './post-ad.component.scss'
})
export class PostAdComponent {

  @ViewChild('modal2') modalRef2!: ElementRef<HTMLDialogElement>;


  private readonly _reportService = inject(ReportService)
  private readonly _exportReportService = inject(ExportService)


  report: AdReportDto[] = [];
  totalReport!: PostAdReportTotal;
  totalAdPost: number = 0;

  startDate = '';
  endDate = '';
  type: number = 0;

  ngOnInit() {
    //this.getReportEarnings()
  }


  exportReport() {
    if (!this.totalReport || this.totalReport.adReportDto.length <= 0) {
      this.modalRef2.nativeElement.showModal()
    }
    const range = `${this.startDate} - ${this.endDate}`
    this.totalReport.range = range;
    this.totalReport.filter = this.getFilter()
    this._exportReportService.downloadReportPostAd(this.totalReport);
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

  getReport() {
    this.type = Number(this.type)
    if (this.startDate === '' || this.endDate === '') {
      this._reportService.getReportPostAd(this.type).subscribe({
        next: value => {
          this.totalReport = value
          this.report = value.adReportDto
          this.totalAdPost = value.totalAdPost
        }
      })
      return;
    }
    this._reportService.getReportPostAd(this.type, this.startDate, this.endDate).subscribe({
      next: value => {
        this.totalReport = value
        this.report = value.adReportDto
        this.totalAdPost = value.totalAdPost
      }
    })
  }

  getFilter(): string {
    this.type = Number(this.type)
    switch (this.type) {
      case 0:
        return 'Totos';
      case 1:
        return 'Imagne y text';
      case 2:
        return 'Video';
      case 3:
        return 'Texto';
      default:
        return 'Totos';
    }
  }


}
