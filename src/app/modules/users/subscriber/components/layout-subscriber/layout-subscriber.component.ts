import { Component } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-subscriber',
  imports: [TopbarComponent, RouterOutlet],
  templateUrl: './layout-subscriber.component.html',
  styleUrl: './layout-subscriber.component.scss'
})
export class LayoutSubscriberComponent {

}
