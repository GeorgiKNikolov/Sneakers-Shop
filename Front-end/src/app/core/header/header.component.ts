import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserForAuth } from '../../types/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  get isLoggedIn(): boolean {
    return this.service.isLogged;
  }


  get user(): UserForAuth {
  
    return this.service.user!;
  }

  constructor(private service: UserService, private route: Router) {
    
    
  }

  logout() {
    console.log('Attempting to logout...');
    this.service.logout().subscribe(() => {
      this.route.navigate(['/login']);
    });
  }
}
