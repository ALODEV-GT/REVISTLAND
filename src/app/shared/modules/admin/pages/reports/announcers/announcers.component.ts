import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnnouncersDto } from '@shared/modules/admin/models/announcer.interface';
import { PaymentPostAdPerAnnouncerDto, TotalReportPaymentPostAdByAnnouncersDto } from '@shared/modules/admin/models/reports/announcers.interface';
import { ExportService } from '@shared/modules/admin/services/export.service';
import { ReportService } from '@shared/modules/admin/services/report.service';
import { ModalMsgComponent } from '@shared/modules/announcer/components/modal-msg/modal-msg.component';
import { AnnouncerService } from '@shared/modules/announcer/services/announcer.service';

@Component({
  selector: 'app-announcers',
  imports: [FormsModule, ModalMsgComponent],
  templateUrl: './announcers.component.html',
  styleUrl: './announcers.component.scss'
})
export class AnnouncersComponent {

  @ViewChild('modal2') modalRef2!: ElementRef<HTMLDialogElement>;

  private readonly _announcerService = inject(AnnouncerService)
  private readonly _reportService = inject(ReportService)
  private readonly _exportReportService = inject(ExportService)


  announcersDto: AnnouncersDto[] = []
  report: PaymentPostAdPerAnnouncerDto[] = []
  totalAdPost: number = 0;
  export!: TotalReportPaymentPostAdByAnnouncersDto;


  startDate = '';
  endDate = '';
  idAdvertiser = 0;



  ngOnInit() {
    this.getAllAnnouncers()
  }

  exportReport() {
    if (!this.export && this.report.length <= 0) {
      this.modalRef2.nativeElement.showModal()
    }
    const range = `${this.startDate} - ${this.endDate}`
    this.export.range = range;
    this.export.filter = this.getAdvertiserName()
    this._exportReportService.downloadReportAnnouncersPostAd(this.export);
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

  getReportByRangeAdnIdAdvertiser() {
    if (this.startDate === '' || this.endDate === '') {

      this._reportService.getReportPostAdAnnuncersById(this.idAdvertiser).subscribe({
        next: value => {
          this.export = value
          this.report = value.paymentPostAdPerAnnouncerDtos
          this.totalAdPost = value.totalAdPost

        }
      })
      return
    }

    this._reportService.getReportPostAdAnnuncersById(this.idAdvertiser, this.startDate, this.endDate).subscribe({
      next: value => {
        this.export = value

        this.report = value.paymentPostAdPerAnnouncerDtos
        this.totalAdPost = value.totalAdPost

      }
    })
  }

  getReportByRange() {
    if (this.startDate === '' || this.endDate === '') {

      this._reportService.getReportPostAdAnnuncers().subscribe({
        next: value => {
          this.export = value
          this.report = value.paymentPostAdPerAnnouncerDtos
          this.totalAdPost = value.totalAdPost
        }
      })
      return
    }

    this._reportService.getReportPostAdAnnuncers(this.startDate, this.endDate).subscribe({
      next: value => {
        this.export = value
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

  getAdvertiserName():string{
    this.idAdvertiser = Number(this.idAdvertiser)
    if (this.idAdvertiser <= 0) {
      return 'Todos';
    }
    return this.announcersDto.find(a => a.id === this.idAdvertiser)?.username || '';
  }


}
