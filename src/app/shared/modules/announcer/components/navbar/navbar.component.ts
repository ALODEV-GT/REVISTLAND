import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from 'app/store/auth.store';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  private readonly route = inject(Router)
  store = inject(AuthStore);
  id = this.store.session().id.toString()
  profilePicture = this.store.session().profilePicture


  ngOnInit(){
    if (!this.profilePicture) {
      this.profilePicture = 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
    }
  }

  goProfile(){
    const id = this.store.session().id.toString()
    this.route.navigate([`profile/${id}`])
  }

}
