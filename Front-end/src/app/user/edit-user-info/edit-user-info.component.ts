import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserForAuth } from '../../types/user';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailDirective } from '../../directives/email.directive';
import { DOMAINS } from '../../constants';

@Component({
  selector: 'app-edit-user-info',
  standalone: true,
  imports: [RouterLink, FormsModule, EmailDirective],
  templateUrl: './edit-user-info.component.html',
  styleUrl: './edit-user-info.component.css',
})
export class EditUserInfoComponent {
  get user(): UserForAuth {
    return this.userService.user!;
  }
  domains = DOMAINS;
  constructor(private userService: UserService, private router: Router) {}
  editInfo(form: NgForm) {
   
    
    if (form.invalid) {
      return;
    }
   const userId = this.userService.user?._id!
  
   
    this.userService.editUserInfo(userId, form.value).subscribe(() => {
      this.router.navigate(['/profile'])
    });
  }
}
