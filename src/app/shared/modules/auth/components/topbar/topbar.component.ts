import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  @Output() buttonClicked = new EventEmitter<void>();

  openLoginModal() {
    this.buttonClicked.emit();
  }
}
