import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@editor/components/navbar/navbar.component';
import { SidebarComponent } from '@editor/components/sidebar/sidebar.component';
import { LucideAngularModule, Menu, X } from 'lucide-angular';

@Component({
  selector: 'editor-layout',
  imports: [
    RouterModule,
    NavbarComponent,
    SidebarComponent,
    LucideAngularModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  readonly Hamburger = Menu;
  readonly X = X;

  sidebarCollapsed = true;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
