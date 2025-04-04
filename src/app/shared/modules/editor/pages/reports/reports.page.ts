import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MinimalMagazine } from '@editor/models/magazine.model';
import {
  allReports,
  Report,
  ReportData,
  ReportFilter,
  ReportType,
} from '@editor/models/report.model';
import { MagazineService } from '@editor/services/magazine.service';
import { ReportService } from '@editor/services/report.service';
import domtoimage from 'dom-to-image';
import { jsPDF } from 'jspdf';
import {
  Book,
  Download,
  Eraser,
  FileChartColumnIncreasing,
  ListFilterPlus,
  LucideAngularModule,
  Sigma,
} from 'lucide-angular';

@Component({
  selector: 'editor-reports',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './reports.page.html',
  styleUrl: './reports.page.scss',
})
export class ReportsPage {
  private readonly formBuilder = inject(FormBuilder);
  private readonly magazineService = inject(MagazineService);
  private readonly reportService = inject(ReportService);

  readonly GenerateReport = FileChartColumnIncreasing;
  readonly AddFilter = ListFilterPlus;
  readonly Export = Download;
  readonly ClearFilter = Eraser;
  readonly Total = Sigma;
  readonly Average = Book;

  readonly reports: Report[] = allReports;

  @ViewChild('report') report!: ElementRef;

  filterForm = this.formBuilder.group({
    startDate: [''],
    endDate: [''],
    magazineId: [0, [Validators.min(0)]],
  });

  chargingData = false;
  magazines: MinimalMagazine[] = [];
  isFilterOpen: boolean = false;
  activeReport!: Report;
  reportData?: ReportData;

  constructor() {
    this.toggleTab(allReports[0].type);
    this.magazineService.getEditorMagazines(false).subscribe((magazines) => {
      this.magazines = magazines;
    });
  }

  isValid(field: string) {
    return (
      this.filterForm.get(field)?.touched && this.filterForm.get(field)?.valid
    );
  }

  isInvalid(field: string) {
    return (
      this.filterForm.get(field)?.touched && this.filterForm.get(field)?.invalid
    );
  }

  toDate(date: string) {
    if (typeof date === 'string' && !isNaN(Date.parse(date))) {
      return new Date(date).toLocaleDateString();
    }
    return undefined;
  }

  clearFilter() {
    this.filterForm.reset();
    this.toggleFilter(false);
  }

  toggleFilter(open: boolean = !this.isFilterOpen) {
    this.isFilterOpen = open;
  }

  toggleTab(type?: ReportType | Event) {
    if (type instanceof Event) {
      type = (type.target as HTMLInputElement)?.value as ReportType;
    }
    if (!type) {
      return;
    }
    this.activeReport = allReports.find((r) => r.type === type)!;
    this.clearFilter();
    this.generateReport();
  }

  generateReport() {
    this.chargingData = true;
    const filter: ReportFilter = this.filterForm.getRawValue();
    const type = this.activeReport.type;

    this.reportService.getReport(type, filter).subscribe((data) => {
      this.reportData = data;
      this.chargingData = false;
    });
  }

  async generatePDF() {
    const report = this.report.nativeElement as HTMLDivElement;
    const { width, height } = report.getBoundingClientRect();
    const imageUrl = await domtoimage
      .toPng(report, { bgcolor: 'oklch(25.33% 0.016 252.42)' })
      .catch((err) => {
        console.error(err);
        return '';
      });

    const pdf = new jsPDF('l', 'px', [width, height]);

    pdf.addImage(imageUrl, 'PNG', 0, 0, width, height);
    pdf.save(`${this.activeReport.name}.pdf`);
  }
}
