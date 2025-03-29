import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MagazineSubscriptions, ReportTopMagazineSubscriptions } from '@shared/modules/admin/models/reports/top-magazine-subscripton';
import { ExportService } from '@shared/modules/admin/services/export.service';
import { ReportService } from '@shared/modules/admin/services/report.service';
import { ModalMsgComponent } from '@shared/modules/announcer/components/modal-msg/modal-msg.component';

@Component({
  selector: 'app-top-magazine-suscriptions',
  imports: [FormsModule, ModalMsgComponent],
  templateUrl: './top-magazine-suscriptions.component.html',
  styleUrl: './top-magazine-suscriptions.component.scss'
})
export class TopMagazineSuscriptionsComponent {

  @ViewChild('modal2') modalRef2!: ElementRef<HTMLDialogElement>;

  private readonly _reportService = inject(ReportService)
  private readonly _exportReportService = inject(ExportService)

  startDate = '';
  endDate = '';
  reportrExport!: ReportTopMagazineSubscriptions;
  subscriptions: MagazineSubscriptions[] = [];


  exportReport() {
    if (!this.reportrExport || this.reportrExport.subscriptions.length <= 0) {
      this.modalRef2.nativeElement.showModal()
    }
    const range = `${this.startDate} - ${this.endDate}`
    this.reportrExport.range = range;
    this._exportReportService.exportReportTop5MagazineSubscriptions(this.reportrExport);
  }

  getReport() {

    if (this.startDate === '' || this.endDate === '') {
      this._reportService.getTop5MagazinesBySubscriptions().subscribe({
        next: value =>{
          this.reportrExport = value
          this.subscriptions = value.subscriptions
        }
      })
      
      return
    }

    this._reportService.getTop5MagazinesBySubscriptions(this.startDate, this.endDate).subscribe({
      next: value =>{
        this.reportrExport = value
        this.subscriptions = value.subscriptions
      }
    })



  }


  formatDateTime(date: any): string {
    const parsedDate = date instanceof Date ? date : new Date(date);
    return parsedDate.toISOString().split('T')[0] + ' ' + parsedDate.toTimeString().slice(0, 5) + ' hrs';
  }

}
