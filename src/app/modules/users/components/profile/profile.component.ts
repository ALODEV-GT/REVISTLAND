import { Component } from '@angular/core';
import { Heart, LucideAngularModule, PenLine, User } from 'lucide-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [LucideAngularModule]
})
export default class ProfileComponent {
  readonly PenLine = PenLine;
  readonly User = User
  readonly Heart = Heart
  


}
