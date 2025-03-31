import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ReportData,
  ReportFilter,
  ReportType,
} from '@editor/models/report.model';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly baseUrl = inject(ApiConfigService).API_EDITOR_REPORTS;
  private readonly http = inject(HttpClient);

  getReport(type: ReportType, filter?: ReportFilter): Observable<ReportData> {
    const params = Object.entries(filter || {}).reduce((acc, [key, value]) => {
      if (value) {
        return { ...acc, [key]: value };
      }
      return acc;
    }, {});

    return this.http.get<ReportData>(`${this.baseUrl}`, {
      params: { ...params, type },
    });
  }
}
