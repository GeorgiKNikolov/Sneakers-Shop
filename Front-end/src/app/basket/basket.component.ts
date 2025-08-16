import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../types/user';
import { SneakersService } from '../services/sneakers.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css',
})
export class BasketComponent implements OnInit {
  user = {} as User;
  items: string[] = [];

  isEmptyBasket = true;

  get totalPrise() {
    let total = 0;

    this.user.basket.forEach((item) => {
      total += Number(item.prise);
    });

    return total;
  }

  constructor(
    private userService: UserService,
    private sneakersService: SneakersService,
    private router: Router,
  
  ) {}

  ngOnInit(): void {
    const { _id }: any = this.userService.user;

    this.userService.getBasket(_id).subscribe((data) => {
      console.log(data);

      this.user = data;
      this.isEmptyBasket = (data.basket.length as number) === 0
    });
  }

  remove(itemId: string) {
    console.log(itemId);

    const { _id }: any = this.userService.user;
    this.userService.removeItemFromBasket(_id, itemId).subscribe({
      next: (updatedUser) => {
        console.log(updatedUser);

        this.user = updatedUser;
        this.isEmptyBasket = true
      },
    });
  }
  //  TODO buy logic
  buyItems() {
    const { _id }: any = this.userService.user;

    this.user.basket.forEach((item) => {
      this.items.push(item._id);
    });

    this.userService.completeOrder(_id).subscribe((data) => {
      this.router.navigate(['/order']);
    });

    this.sneakersService.orderedItems(this.items).subscribe((data) => {});
  }
}
