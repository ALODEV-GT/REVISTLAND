import { Component } from '@angular/core';
import { Heart, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-magazine-detail',
  imports: [LucideAngularModule],
  templateUrl: './magazine-detail.component.html',
  styleUrl: './magazine-detail.component.scss'
})
export default class MagazineDetailComponent {
  readonly Heart = Heart
}
