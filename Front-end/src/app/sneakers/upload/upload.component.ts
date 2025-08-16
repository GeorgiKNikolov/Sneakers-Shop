import { Component } from '@angular/core';
import { SneakersService } from '../../services/sneakers.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NumberDirective } from '../../directives/number.directive';
import { ImageDirective } from '../../directives/image.directive';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormsModule, NumberDirective, ImageDirective],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  get currentUserId(): string {
    const { _id }: any = this.userService.user;
     
    return _id || '';
  }

  constructor(
    private service: SneakersService,
    private router: Router,
    private userService: UserService
  ) {}

  upload(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const {
      activity,
      brand,
      description,
      material,
      photo,
      season,
      size,
      technology,
      userId,
      prise
    } = form.value;

    this.service
      .upload(
        activity,
        brand,
        description,
        material,
        photo,
        season,
        size,
        prise,
        technology,
        userId
      )
      .subscribe((data) => {
        console.log(data);

        this.router.navigate(['/gallery']);
      });
  }
}
