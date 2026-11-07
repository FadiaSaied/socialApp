import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isDropdownOpen = false;
  user = signal(JSON.parse(localStorage.getItem('user')!));

  private readonly authService = inject(AuthService);

  logOut() {
    this.authService.logOut();
  }
}
