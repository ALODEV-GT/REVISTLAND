import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  Chart,
  ExpiredAdBlocks,
  Stats
} from '@editor/models/dashboard.model';
import { DashboardService } from '@editor/services/dashboard.service';
import {
  Eye,
  Heart,
  LucideAngularModule,
  MessagesSquare,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-angular';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'editor-dashboard',
  imports: [CommonModule, LucideAngularModule, NgApexchartsModule],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})
export class DashboardPage implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  readonly Wallet = Wallet;
  readonly Likes = Heart;
  readonly Comments = MessagesSquare;
  readonly Subscriptions = Eye;
  readonly Up = TrendingUp;
  readonly Down = TrendingDown;

  readonly responsive: ApexResponsive[] = [
    {
      breakpoint: 480,
      options: { chart: { width: 200 }, legend: { position: 'bottom' } },
    },
  ];

  stats?: Stats;
  performance?: Chart<ApexAxisChartSeries>;
  topMagazines?: Chart<ApexAxisChartSeries>;
  subscriptionsState?: Chart<ApexNonAxisChartSeries>;
  expiredBlocks?: ExpiredAdBlocks;

  ngOnInit(): void {
    this.stats = undefined;
    this.performance = undefined;
    this.topMagazines = undefined;
    this.subscriptionsState = undefined;
    this.expiredBlocks = undefined;

    this.dashboardService.getStats().subscribe((stats) => {
      this.stats = stats;
    });

    this.dashboardService.getPerformance().subscribe((performance) => {
      this.performance = {
        tags: performance.map(({ groupBy }) => groupBy),
        data: [
          {
            name: 'Likes',
            data: performance.map(({ groupBy, likes }) => ({
              x: groupBy,
              y: likes,
            })),
          },
          {
            name: 'Comentarios',
            data: performance.map(({ groupBy, comments }) => ({
              x: groupBy,
              y: comments,
            })),
          },
          {
            name: 'Suscripciones',
            data: performance.map(({ groupBy, subscriptions }) => ({
              x: groupBy,
              y: subscriptions,
            })),
          },
        ],
      };
    });

    this.dashboardService.getTopMagazines().subscribe((topMagazines) => {
      this.topMagazines = {
        tags: topMagazines.map(({ groupBy }) => groupBy),
        data: [
          { name: 'Likes', data: topMagazines.map(({ likes }) => likes) },
          {
            name: 'Comentarios',
            data: topMagazines.map(({ comments }) => comments),
          },
          {
            name: 'Suscripciones',
            data: topMagazines.map(({ subscriptions }) => subscriptions),
          },
        ],
      };
    });

    this.dashboardService
      .getSubscriptionsResume()
      .subscribe((subscriptionsResume) => {
        const { activePercent, inactivePercent } = subscriptionsResume;
        this.subscriptionsState = {
          tags: ['Activas', 'No activas'],
          data: [activePercent, inactivePercent],
        };
      });

    this.dashboardService.getExpiredAdBlocks().subscribe((expiredAdBlocks) => {
      this.expiredBlocks = expiredAdBlocks.map(
        ({ expirationDate, magazineTitle }) => ({
          date: new Date(expirationDate),
          title: magazineTitle,
        })
      );
    });
  }
}
