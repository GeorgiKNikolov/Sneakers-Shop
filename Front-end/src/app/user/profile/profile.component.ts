import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserForAuth } from '../../types/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  get user(): UserForAuth {
    return this.service.user!;
  }

  constructor(private service: UserService) {}



  editInfo(){
    
  }
}
