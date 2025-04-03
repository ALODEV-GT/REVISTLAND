import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ChartPlot,
  ExpiredAdBlock,
  Stats,
  SubscriptionsResume,
} from '@editor/models/dashboard.model';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly baseUrl = inject(ApiConfigService).API_EDITOR_DASHBOARD;
  private readonly http = inject(HttpClient);

  getStats(): Observable<Stats> {
    return this.http.get<Stats>(this.baseUrl, { params: { type: 'stats' } });
  }

  getPerformance(): Observable<ChartPlot[]> {
    return this.http.get<ChartPlot[]>(this.baseUrl, {
      params: { type: 'performance' },
    });
  }

  getTopMagazines(): Observable<ChartPlot[]> {
    return this.http.get<ChartPlot[]>(this.baseUrl, {
      params: { type: 'top-magazines' },
    });
  }

  getSubscriptionsResume(): Observable<SubscriptionsResume> {
    return this.http.get<SubscriptionsResume>(this.baseUrl, {
      params: { type: 'subscriptions-resume' },
    });
  }

  getExpiredAdBlocks(): Observable<ExpiredAdBlock[]> {
    return this.http.get<ExpiredAdBlock[]>(this.baseUrl, {
      params: { type: 'expired-ad-blocks' },
    });
  }
}
