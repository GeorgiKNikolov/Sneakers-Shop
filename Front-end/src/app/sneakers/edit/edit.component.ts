import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NumberDirective } from '../../directives/number.directive';
import { ImageDirective } from '../../directives/image.directive';
import { SneakersService } from '../../services/sneakers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sneakers } from '../../types/sneakers';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, NumberDirective, ImageDirective],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  sneakers = {} as Sneakers;

  constructor(
    private service: SneakersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  id='';
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.service.getOne(this.id).subscribe((data) => {
      this.sneakers = data;
      console.log(this.sneakers);
    });
  }

  edit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const data = form.value;

    this.service
      .edit(
        this.id, data
      )
      .subscribe((data) => {
        console.log(data);

        this.router.navigate(['/gallery']);
      });
  }
}
