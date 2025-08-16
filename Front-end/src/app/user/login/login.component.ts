import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { EmailDirective } from '../../directives/email.directive';
import { DOMAINS } from '../../constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, EmailDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  domains = DOMAINS;
  constructor(private service: UserService, private router: Router) {}

  login(form: NgForm) {
    if (form.invalid) {
      console.error('Invalid Login Form!');
      return;
    }

    const { email, password } = form.value;
  

    this.service.login(email, password).subscribe(()=>{
      this.router.navigate(['/gallery'])
    })


  }
}
