import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css',
})
export class AuthenticateComponent implements OnInit {
  isAuth = true;
  constructor(private service: UserService) {}
  ngOnInit(): void {
    this.service.getProfile().subscribe({
      next: () => {
        this.isAuth = false;
      },
      error: () => {
        this.isAuth = false;
      },
      complete: () => {
        this.isAuth = false;
      },
    });
  }
}
