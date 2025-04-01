import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MagazineCommentsDto, ReportMagazineCommentsDto } from '@shared/modules/admin/models/reports/top-magazine-comments';
import { ExportService } from '@shared/modules/admin/services/export.service';
import { ReportService } from '@shared/modules/admin/services/report.service';
import { ModalMsgComponent } from '@shared/modules/announcer/components/modal-msg/modal-msg.component';

@Component({
  selector: 'app-top-magazine-coments',
  imports: [FormsModule, ModalMsgComponent],
  templateUrl: './top-magazine-coments.component.html',
  styleUrl: './top-magazine-coments.component.scss'
})
export class TopMagazineComentsComponent {

  @ViewChild('modal2') modalRef2!: ElementRef<HTMLDialogElement>;


  private readonly _reportService = inject(ReportService)
  private readonly _exportReportService = inject(ExportService)



  startDate = '';
  endDate = '';
  magazineCommentsDtoList: MagazineCommentsDto[] = [];
  report!: ReportMagazineCommentsDto;


  getReport() {
    if (this.startDate === '' || this.endDate === '') {
      this._reportService.getTop5MagazinesByComments().subscribe({
        next: value => {
          this.report = value
          this.magazineCommentsDtoList = value.magazineCommentsDtoList
        }
      })

      return
    }

    this._reportService.getTop5MagazinesByComments(this.startDate, this.endDate).subscribe({
      next: value => {
        this.report = value
        this.magazineCommentsDtoList = value.magazineCommentsDtoList
      }
    })
  }

  exportReport() {
    if (!this.report || this.report.magazineCommentsDtoList.length <= 0) {
      this.modalRef2.nativeElement.showModal()
    }
    const range = `${this.startDate} - ${this.endDate}`
    this.report.range = range;
    this._exportReportService.exportReportTop5MagazineComments(this.report);
  }

  formatDateTime(date: any): string {
    const dateString = `${date}`
    const [datePart, timePart] = dateString.split('T');
    const time = timePart.slice(0, 5);

    return `${datePart} ${time} hrs`;
  }


}
