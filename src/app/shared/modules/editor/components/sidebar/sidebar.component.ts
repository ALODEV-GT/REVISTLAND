import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BookPlus,
  ChartNoAxesCombined,
  ChartPie,
  FilePlus,
  Library,
  LucideAngularModule,
  Menu,
  Wallet,
  X,
} from 'lucide-angular';

@Component({
  selector: 'editor-sidebar',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  readonly Menu = Menu;
  readonly Close = X;
  readonly Dashboard = ChartPie;
  readonly Magazines = Library;
  readonly PublishMagazine = BookPlus;
  readonly PublishIssue = FilePlus;
  readonly Reports = ChartNoAxesCombined;
  readonly Wallet = Wallet;

  isCollapsed = true;

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
}
