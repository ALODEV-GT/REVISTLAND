import { Component } from '@angular/core';
import { Heart, LucideAngularModule } from 'lucide-angular';


@Component({
  selector: 'app-home',
  imports: [LucideAngularModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {
  readonly Heart = Heart


}
