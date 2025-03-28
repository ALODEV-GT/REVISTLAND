import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MagazineCommentsDto, ReportMagazineCommentsDto } from '@shared/modules/admin/models/reports/top-magazine-comments';
import { ReportService } from '@shared/modules/admin/services/report.service';

@Component({
  selector: 'app-top-magazine-coments',
  imports: [FormsModule],
  templateUrl: './top-magazine-coments.component.html',
  styleUrl: './top-magazine-coments.component.scss'
})
export class TopMagazineComentsComponent {

  private readonly _reportService = inject(ReportService)


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

  formatDateTime(date: any): string {
    const parsedDate = date instanceof Date ? date : new Date(date);
    return parsedDate.toISOString().split('T')[0] + ' ' + parsedDate.toTimeString().slice(0, 5) + ' hrs';
  }


}
