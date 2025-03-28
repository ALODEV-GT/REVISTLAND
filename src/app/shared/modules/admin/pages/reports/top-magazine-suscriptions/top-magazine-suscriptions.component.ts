import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MagazineSubscriptions, ReportTopMagazineSubscriptions } from '@shared/modules/admin/models/reports/top-magazine-subscripton';
import { ReportService } from '@shared/modules/admin/services/report.service';

@Component({
  selector: 'app-top-magazine-suscriptions',
  imports: [FormsModule],
  templateUrl: './top-magazine-suscriptions.component.html',
  styleUrl: './top-magazine-suscriptions.component.scss'
})
export class TopMagazineSuscriptionsComponent {

  private readonly _reportService = inject(ReportService)

  startDate = '';
  endDate = '';
  reportrExport: ReportTopMagazineSubscriptions | null = null;
  subscriptions: MagazineSubscriptions[] = [];

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
