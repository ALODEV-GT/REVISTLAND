import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthStore } from 'app/store/auth.store';

@Component({
  selector: 'app-topbar',
  imports: [RouterLink],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  readonly store = inject(AuthStore);
  private readonly router = inject(Router)

  goProfile() {
    const id = this.store.session().id.toString()
    this.router.navigate([`profile/${id}`])
    this.store.session().firstname
  }
}
