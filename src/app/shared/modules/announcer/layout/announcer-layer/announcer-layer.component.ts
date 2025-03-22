import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-announcer-layer',
  imports: [RouterModule, CommonModule, SidebarComponent, NavbarComponent],
  templateUrl: './announcer-layer.component.html',
  styleUrl: './announcer-layer.component.scss'
})
export class AnnouncerLayerComponent {

}
