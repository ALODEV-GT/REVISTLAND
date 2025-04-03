import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdvertiserAdViewsDto, ReportAdvertiserAdViews } from '@shared/modules/admin/models/reports/ad-effective';
import { MagazineCommentsDto, ReportMagazineCommentsDto } from '@shared/modules/admin/models/reports/top-magazine-comments';
import { ExportService } from '@shared/modules/admin/services/export.service';
import { ReportService } from '@shared/modules/admin/services/report.service';
import { ModalMsgComponent } from '@shared/modules/announcer/components/modal-msg/modal-msg.component';

@Component({
  selector: 'app-ad-effectiveness',
  imports: [FormsModule, ModalMsgComponent],
  templateUrl: './ad-effectiveness.component.html',
  styleUrl: './ad-effectiveness.component.scss'
})
export class AdEffectivenessComponent {

  @ViewChild('modal2') modalRef2!: ElementRef<HTMLDialogElement>;

  private readonly _reportService = inject(ReportService)
  private readonly _exportReportService = inject(ExportService)

  startDate = '';
  endDate = '';
  report!: ReportAdvertiserAdViews;
  advertiserAdViews: AdvertiserAdViewsDto[] = []

  getReport() {

    if (this.startDate === '' || this.endDate === '') {

      this._reportService.getAdsEfeectives().subscribe({
        next: value => {
          this.report = value
          this.advertiserAdViews = value.advertiserAdViews
        }
      })
      return
    }

    this._reportService.getAdsEfeectives(this.startDate, this.endDate).subscribe({
      next: value => {
        this.report = value
        this.advertiserAdViews = value.advertiserAdViews
      }
    })
  }

  exportReport() {
    if (!this.report || this.report.advertiserAdViews.length <= 0) {
      this.modalRef2.nativeElement.showModal()
    }
    const range = `${this.startDate} - ${this.endDate}`
    this.report.range = range;
    this._exportReportService.exportReportAdEffectiveness(this.report);

  }

  formatDateTime(date: any): string {
    const dateString = `${date}`
    const [datePart, timePart] = dateString.split('T');
    const time = timePart.slice(0, 5);

    return `${datePart} ${time} hrs`;
  }



}
