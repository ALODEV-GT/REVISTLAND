import { Component } from '@angular/core';
import { Heart, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-my-subscriptions',
  imports: [LucideAngularModule],
  templateUrl: './my-subscriptions.component.html',
  styleUrl: './my-subscriptions.component.scss'
})
export default class MySubscriptionsComponent {
  readonly Heart = Heart
}
