import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-report',
  imports: [],
  templateUrl: './home-report.component.html',
  styleUrl: './home-report.component.scss'
})
export class HomeReportComponent {

  private readonly route = inject(Router)


  goReportEarning(){
    this.route.navigate(['admin/reports/earnings'])
  }

  goReportPostAd(){
    this.route.navigate(['admin/reports/posts-ad'])
  }

}
