import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { EarningsReport, PostAdReportTotal } from '../models/reports/earnings.interface';
import { TotalReportPaymentPostAdByAnnouncersDto } from '../models/reports/announcers.interface';
import { ReportTopMagazineSubscriptions } from '../models/reports/top-magazine-subscripton';
import { ReportMagazineCommentsDto } from '../models/reports/top-magazine-comments';
import { ReportAdvertiserAdViews } from '../models/reports/ad-effective';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  private readonly _http = inject(HttpClient)
  private readonly apiConfigService = inject(ApiConfigService);
  private readonly API_EXPORT = this.apiConfigService.API_EXPORT;

  constructor() { }

  downloadReportEarnings(earningsReport: EarningsReport) {
    // Realiza la petición POST enviando el objeto en el body
    this._http.post(`${this.API_EXPORT}/earning`, earningsReport, {
      responseType: 'blob' // Importante para manejar el PDF como Blob
    }).subscribe({
      next: (response) => {
        // Descargar el archivo PDF
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reporte_de_Ganancias.pdf'; // Nombre del archivo descargado
        a.click();
        window.URL.revokeObjectURL(url); // Limpia la URL temporal
      },
      error: (err) => {
        console.error('Error al descargar el PDF:', err);
      }
    });
  }

  downloadReportPostAd(postAdReportTotal: PostAdReportTotal) {
    // Realiza la petición POST enviando el objeto en el body
    this._http.post(`${this.API_EXPORT}/post-ad`, postAdReportTotal, {
      responseType: 'blob' // Importante para manejar el PDF como Blob
    }).subscribe({
      next: (response) => {
        // Descargar el archivo PDF
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reporte_de_anuncios.pdf'; // Nombre del archivo descargado
        a.click();
        window.URL.revokeObjectURL(url); // Limpia la URL temporal
      },
      error: (err) => {
        console.error('Error al descargar el PDF:', err);
      }
    });
  }

  downloadReportAnnouncersPostAd(dto: TotalReportPaymentPostAdByAnnouncersDto) {
    // Realiza la petición POST enviando el objeto en el body
    this._http.post(`${this.API_EXPORT}/announcers-post-ad`, dto, {
      responseType: 'blob' // Importante para manejar el PDF como Blob
    }).subscribe({
      next: (response) => {
        // Descargar el archivo PDF
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reporte_de_anuncios_por_anunciante.pdf'; // Nombre del archivo descargado
        a.click();
        window.URL.revokeObjectURL(url); // Limpia la URL temporal
      },
      error: (err) => {
        console.error('Error al descargar el PDF:', err);
      }
    });
  }

  exportReportTop5MagazineSubscriptions(dto: ReportTopMagazineSubscriptions) {
    // Realiza la petición POST enviando el objeto en el body
    this._http.post(`${this.API_EXPORT}/top-5-magazine-subscriptions`, dto, {
      responseType: 'blob' // Importante para manejar el PDF como Blob
    }).subscribe({
      next: (response) => {
        // Descargar el archivo PDF
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reporte_top-5-magazine-mas-suscriptores.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar el PDF:', err);
      }
    });
  }

  exportReportTop5MagazineComments(dto: ReportMagazineCommentsDto) {
    // Realiza la petición POST enviando el objeto en el body
    this._http.post(`${this.API_EXPORT}/top-5-magazine-comments`, dto, {
      responseType: 'blob' // Importante para manejar el PDF como Blob
    }).subscribe({
      next: (response) => {
        // Descargar el archivo PDF
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reporte_top-5-revistas-mas-comentadas.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar el PDF:', err);
      }
    });
  }

  exportReportAdEffectiveness(dto: ReportAdvertiserAdViews) {
    // Realiza la petición POST enviando el objeto en el body
    this._http.post(`${this.API_EXPORT}/ad-effectiveness`, dto, {
      responseType: 'blob' // Importante para manejar el PDF como Blob
    }).subscribe({
      next: (response) => {
        // Descargar el archivo PDF
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reporte_de_eefectividad_anuncios.pdf'; // Nombre del archivo descargado
        a.click();
        window.URL.revokeObjectURL(url); // Limpia la URL temporal
      },
      error: (err) => {
        console.error('Error al descargar el PDF:', err);
      }
    });
  }


}
