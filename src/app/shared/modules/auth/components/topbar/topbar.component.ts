import { Component, EventEmitter, Output } from '@angular/core';
import { LucideAngularModule, Ellipsis } from 'lucide-angular';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  imports: [LucideAngularModule]
})
export class TopbarComponent {
  @Output() buttonClicked = new EventEmitter<void>();

  //icons
  readonly Ellipsis = Ellipsis;

  openLoginModal() {
    this.buttonClicked.emit();
  }

}
