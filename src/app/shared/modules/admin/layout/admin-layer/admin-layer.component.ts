import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@shared/modules/announcer/components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layer',
  imports: [NavbarComponent, RouterModule, SidebarComponent],
  templateUrl: './admin-layer.component.html',
  styleUrl: './admin-layer.component.scss'
})
export class AdminLayerComponent {

}
