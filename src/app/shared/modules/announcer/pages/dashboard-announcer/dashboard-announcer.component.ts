import { Component, ViewChild, inject } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { WalletDto } from '../../models/wallet.interface';
import { AnnouncerService } from '../../services/announcer.service';
import { CountAdByTypeDto, PostAdMount, TotalAdsDto, TotalAmountMoth } from '../../models/ad-post-dto.interface';
import { ChartBarComponent } from '../../components/chart-bar/chart-bar.component';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  NgApexchartsModule,
  ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dashboard-announcer',
  imports: [ChartBarComponent, NgApexchartsModule],
  templateUrl: './dashboard-announcer.component.html',
  styleUrl: './dashboard-announcer.component.scss'
})
export class DashboardAnnouncerComponent {


  //services
  private readonly _walletService = inject(WalletService)
  private readonly _announcerService = inject(AnnouncerService)

  wallet: WalletDto = { balance: 0.00, id: 0 };
  totalAds: TotalAdsDto = { total: 0, totalActive: 0 };
  postAdCountMount: PostAdMount[] = []
  counViewMonth: PostAdMount[] = []
  totalAmount: TotalAmountMoth[] = []
  totalViews: number = 0;

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [0, 0, 0],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Texto", "Texto e imagen", "Video"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit() {
    this.getWalletUser();
    this.getTotalAds();
    this.getTotalAdViews();
    this.getPostAdCountMount();
    this.getCountViewsMount();
    this.getTotalAmountMoth();
    this.getAllPostAdMountType()
  }

  getPostAdCountMount() {
    this._announcerService.getPostCountMount().subscribe({
      next: value => {
        this.postAdCountMount = value
      }
    })
  }

  getWalletUser() {
    this._walletService.getWalletByUserId().subscribe({
      next: value => {
        this.wallet = value
      }
    })
  }

  getTotalAds() {
    this._announcerService.getTotalAdUser().subscribe({
      next: value => {
        this.totalAds = value
      }
    })
  }

  getTotalAdViews() {
    this._announcerService.getTotalAdViewsUser().subscribe({
      next: value => {
        this.totalViews = value.total;
      }
    })
  }

  getCountViewsMount() {
    this._announcerService.getCountViewsMount().subscribe({
      next: value => {
        this.counViewMonth = value
      }
    })
  }

  getTotalAmountMoth() {
    this._announcerService.getTotalAmountMoth().subscribe({
      next: value => {
        this.totalAmount = value
      }
    })
  }

  getAllPostAdMountType() {
    this._announcerService.getAllPostAdMountType().subscribe({
      next: value => {
        this.buildCharPie(value)
      }
    })
  }

  buildCharPie(value: CountAdByTypeDto[]){
    const series = [0, 0, 0]
    for (const a of value) {
      if (a.adType === 'TEXT') {
        series[0] = a.count
        continue
      }
      if (a.adType === 'TEXT_IMAGE') {
        series[1] = a.count
        continue
      }
      if (a.adType === 'VIDEO') {
        series[2] = a.count
        continue
      }
    }

    this.chartOptions = {
      series: series,
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Texto", "Texto e imagen", "Video"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}
