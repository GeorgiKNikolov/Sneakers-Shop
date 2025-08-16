import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constants';
import { matchPasswordValidator } from '../../utils/match-password.validator';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private service: UserService, private router: Router) {}

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [Validators.required, emailValidator(DOMAINS)]),
    tel: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    passGroup: new FormGroup(
      {
        password: new FormControl('', [Validators.required]),
        rePassword: new FormControl('', [Validators.required]),
      },
      {
        validators: [matchPasswordValidator('password', 'rePassword')],
      }
    ),
  });

  get passGroup() {
    return this.form.get('passGroup');
  }

  register() {
    if (this.form.invalid) {
      return console.error('Invalid Register Form!');
    }
    const {
      username,
      email,
      tel,
      image,
      passGroup: { password, rePassword } = {},
    } = this.form.value;
    this.service
      .registger(username!, email!, tel!, image!, password!, rePassword!)
      .subscribe(() => {
        this.router.navigate(['/home'])
      });
  }
}
