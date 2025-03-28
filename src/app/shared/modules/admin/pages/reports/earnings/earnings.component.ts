import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EarningsReport } from '@shared/modules/admin/models/reports/earnings.interface';
import { ExportService } from '@shared/modules/admin/services/export.service';
import { ReportService } from '@shared/modules/admin/services/report.service';
import { ModalMsgComponent } from '@shared/modules/announcer/components/modal-msg/modal-msg.component';

@Component({
  selector: 'app-earnings',
  imports: [FormsModule, ModalMsgComponent],
  templateUrl: './earnings.component.html',
  styleUrl: './earnings.component.scss'
})
export class EarningsComponent {


  @ViewChild('modal2') modalRef2!: ElementRef<HTMLDialogElement>;

  
  private readonly _reportService = inject(ReportService)
  private readonly _exportReportService = inject(ExportService)
  report!: EarningsReport;

  startDate = '';
  endDate = '';

  ngOnInit(){
    //this.getReportEarnings()
  }

  exportReport(){
    if (!this.report) {
      this.modalRef2.nativeElement.showModal()
    }
    const range = `${this.startDate} - ${this.endDate}`
    this.report.range = range;
    this._exportReportService.downloadReportEarnings(this.report);
  }


  getReport(){
    if (this.startDate === '' || this.endDate === '') {
      this._reportService.getReportEarnings().subscribe({
        next: value =>{
          this.report = value
        }
      })
      return;
    }
    this._reportService.getReportEarnings(this.startDate, this.endDate).subscribe({
      next: value =>{
        this.report = value
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
