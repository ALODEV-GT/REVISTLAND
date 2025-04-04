import { Component, ViewChild, inject } from '@angular/core';
import { TarjetComponent } from '../../components/tarjet/tarjet.component';
import { TypeTarjet } from '../../models/type-tarjet.enum';
import { FormsModule } from '@angular/forms';
import { DashboadService } from '../../services/dashboad.service';
import { PostAdMount } from '@shared/modules/announcer/models/ad-post-dto.interface';
import { ChartBarComponent } from '@shared/modules/announcer/components/chart-bar/chart-bar.component';
import { CountRegisterByRolDto } from '../../models/count-register-by-role.interface';


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
  selector: 'app-dashboard',
  imports: [TarjetComponent, FormsModule, ChartBarComponent, NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  // charts
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;

  // awecixwa
  private readonly _dashboardService = inject(DashboadService)


  //arrays
  postAdCountMount: PostAdMount[] = []
  postMagazineCountMount: PostAdMount[] = []
  registerUserMonth: PostAdMount[] = []

  startDate: string = '';
  endDate: string = '';

  TypeTarjet = TypeTarjet;


  constructor() {
    this.chartOptions = {
      series: [0, 0, 0],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Editor", "Anunciador", "Suscriptor"],
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
    this.getAdCountsByMonth();
    this.getMagazineCountsByMonth();
    this.getCountRegisterByroler();
    this.getUserRegisterByMonth();
  }

  getAdCountsByMonth() {
    if (this.startDate === '' || this.endDate === '') {
      this._dashboardService.getAdCountsByMonth().subscribe({
        next: value => {
          this.postAdCountMount = value
        }
      })
      return
    }

    this._dashboardService.getAdCountsByMonth(this.startDate, this.endDate).subscribe({
      next: value => {
        this.postAdCountMount = value
      }
    })

  }

  getUserRegisterByMonth() {
    if (this.startDate === '' || this.endDate === '') {
      this._dashboardService.getRegisterUsers().subscribe({
        next: value => {
          this.registerUserMonth = value
        }
      })
      return
    }

    this._dashboardService.getRegisterUsers(this.startDate, this.endDate).subscribe({
      next: value => {
        this.registerUserMonth = value
      }
    })

  }

  getMagazineCountsByMonth() {
    if (this.startDate === '' || this.endDate === '') {
      this._dashboardService.getMagazineCountsByMonth().subscribe({
        next: value => {
          this.postMagazineCountMount = value
        }
      })
      return
    }

    this._dashboardService.getMagazineCountsByMonth(this.startDate, this.endDate).subscribe({
      next: value => {
        this.postMagazineCountMount = value
      }
    })

  }

  getCountRegisterByroler() {
    if (this.startDate === '' || this.endDate === '') {
      this._dashboardService.getCountByRole().subscribe({
        next: value => {
          this.buildCharPie(value)
        }
      })
      return
    }

    this._dashboardService.getCountByRole(this.startDate, this.endDate).subscribe({
      next: value => {
        this.buildCharPie(value)
      }
    })
  }

  update() {
    this.getAdCountsByMonth()
    this.getMagazineCountsByMonth()
    this.getCountRegisterByroler()
  }

  buildCharPie(value: CountRegisterByRolDto[]) {
    const series = [0, 0, 0]
    for (const a of value) {
      if (a.typeUser === 'ANNOUNCER') {
        series[0] = a.count
        continue
      }
      if (a.typeUser === 'EDITOR') {
        series[1] = a.count
        continue
      }
      if (a.typeUser === 'USER') {
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
      labels: ["Editor", "Anunciador", "Suscriptor"],
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
