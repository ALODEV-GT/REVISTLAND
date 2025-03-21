import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule
} from "ng-apexcharts";
import { PostAdMount } from '../../models/ad-post-dto.interface';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-chart-bar',
  imports: [NgApexchartsModule],
  templateUrl: './chart-bar.component.html',
  styleUrl: './chart-bar.component.scss'
})
export class ChartBarComponent {

  @ViewChild("chart") chart: ChartComponent | undefined;
  @Input() postAdCountMount!: PostAdMount[]
  @Input() title!: string;
  @Input() label!: string;
  @Input() category!: string;

  months = [
    "Enr", "Feb", "Marzo", "Abr", "May", "Jun",
    "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"
  ];

  mostrarHtml = false

  mountMap: Record<string, number> = {}
  monthCounts:  Record<string, number> = {}


  public chartOptions: ChartOptions = {
    series: [
      {
        name: this.label,
        data: []
      }
    ],
    chart: {
      height: 350,
      type: "bar"
    },
    title: {
      text: this.title
    },
    xaxis: {
      categories: this.months,
      title: {
        text: this.category
      }
    }
  };


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['postAdCountMount'] && this.postAdCountMount?.length > 0) {
      this.mostrarHtml = false;      

      console.log(this.title);
      
      this.buildData();
  
      const categories = Object.keys(this.monthCounts);
      const data = Object.values(this.monthCounts);
  
  
      // Actualizar chartOptions con nuevos datos
      this.chartOptions = {
        ...this.chartOptions,
        xaxis: {
          categories: categories,
          title: {
            text: this.category
          }
        },
        title: {
          text: this.title
        },
        series: [
          {
            name: this.label,
            data: data,
          },
        ],
      };
  
      this.mostrarHtml = true;
    }
  }
  

  buildData() {
    if (!this.postAdCountMount || this.postAdCountMount.length === 0) {
      return;
    }
  
    this.mountMap = this.postAdCountMount.reduce((acc, item) => {
      acc[item.month] = item.count;
      return acc;
    }, {} as Record<string, number>);
  
    this.monthCounts = this.months.reduce((acc, month, index) => {
      const key = String(index + 1).padStart(2, '0');
      acc[month] = this.mountMap[key] ?? 0; // Asegurar que si no hay datos, sea 0
      return acc;
    }, {} as Record<string, number>);
  }
  

}
