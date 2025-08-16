import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

   get isLoggedIn(): boolean {
    return this.service.isLogged;
  }

  constructor(private service :UserService){}
}
