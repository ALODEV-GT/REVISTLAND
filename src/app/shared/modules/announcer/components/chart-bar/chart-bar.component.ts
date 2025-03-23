import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule
} from "ng-apexcharts";
import { PostAdMount, TotalAmountMoth } from '../../models/ad-post-dto.interface';


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

  @Input() postAdCountMount!: PostAdMount[] | TotalAmountMoth []
  @Input() title!: string;
  @Input() label!: string;
  @Input() category!: string;

  months = [
    "Enr", "Feb", "Mar", "Abr", "May", "Jun",
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
  
    // Verificar si el array contiene objetos tipo PostAdMount o TotalAmountMoth
    const firstItem = this.postAdCountMount[0];
  
    if ("count" in firstItem) {
      this.mountMap = (this.postAdCountMount as PostAdMount[]).reduce((acc, item) => {
        acc[item.month] = item.count;
        return acc;
      }, {} as Record<string, number>);
    } else {
      this.mountMap = (this.postAdCountMount as TotalAmountMoth[]).reduce((acc, item) => {
        acc[item.month] = item.amount;
        return acc;
      }, {} as Record<string, number>);
    }
  
    this.monthCounts = this.months.reduce((acc, month, index) => {
      const key = String(index + 1).padStart(2, '0');
      acc[month] = this.mountMap[key] ?? 0; // Si no hay datos, poner 0
      return acc;
    }, {} as Record<string, number>);
  }
  
  

}
