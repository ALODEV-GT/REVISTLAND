import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReportViewsAdComponent } from '../../components/reports/report-views-ad/report-views-ad.component';
import { AdDto, AdViewReportDto } from '../../models/ad-post-dto.interface';
import { AnnouncerService } from '../../services/announcer.service';
import { ReportAdComponent } from '../../components/reports/report-ad/report-ad.component';

@Component({
  selector: 'app-report-ad-layer',
  imports: [FormsModule, ReportViewsAdComponent, ReportAdComponent],
  templateUrl: './report-ad-layer.component.html',
  styleUrl: './report-ad-layer.component.scss'
})
export class ReportAdLayerComponent {

  private readonly _announcerService = inject(AnnouncerService)


  typeReport = "views";
  startDate = '';
  endDate = '';
  reportGenerated = false;

  viewsAd: AdViewReportDto[] = []
  adsReport: AdDto[] = [];

  constructor() { }

  genertedReport() {
    this.reportGenerated =  true
    if (this.typeReport === "views") {
      //generar vistas
      this.getReporteViws()
      return
    }

    if (this.typeReport === "ads") {
      // vigentes
      this.getReporteAds()
      return
    }
  }

  getReporteViws() {
    if (this.startDate === '' || this.endDate === '') {
      this._announcerService.getReportViewsAd().subscribe({
        next: value => {
          this.viewsAd = value
        }
      })
      return
    }

    this._announcerService.getReportViewsAd(this.startDate, this.endDate).subscribe({
      next: value => {
        this.viewsAd = value
      }
    })
  }

  getReporteAds() {
    if (this.startDate === '' || this.endDate === '') {
      this._announcerService.getAllMyAdsReport().subscribe({
        next: value => {
          this.adsReport = value
        }
      })
      return
    }

    this._announcerService.getAllMyAdsReport(this.startDate, this.endDate).subscribe({
      next: value => {
        this.adsReport = value
      }
    })
  }

  exportPDF() {
    if (!this.reportGenerated) {
      // TODO: modal o algo warnnign generra primero el reporte
      return
    }
    switch (this.typeReport) {
      case 'views':
        // TODO: exportar views
        break;

      case 'ads':
        //TODO: exportar ads
        break;

      default:
        //TODO: exportar details views
        break;
    }

  }



}
