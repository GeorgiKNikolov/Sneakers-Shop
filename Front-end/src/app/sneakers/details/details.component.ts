import { Component, OnInit } from '@angular/core';
import { SneakersService } from '../../services/sneakers.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Sneakers } from '../../types/sneakers';
import { UserService } from '../../services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommentsService } from '../../services/comments.service';
import { Comments } from '../../types/comments';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, FormsModule, DatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  sneakers = {} as Sneakers;
  comments = {} as Comments[];

  isEmpty: boolean = true;

  isLiked: boolean = false;

  clicked: boolean = false;

  ownerID = '';
  productID = '';
  get isOwner(): boolean {
    return this.ownerID === this.productID;
  }

  constructor(
    private service: SneakersService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private commentService: CommentsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.service.getOne(id).subscribe((data) => {
      this.sneakers = data;

      this.productID = this.sneakers.owner;
      this.isLiked = this.sneakers.likes.includes(this.ownerID);
    });

    this.commentService.getComments(id).subscribe((data) => {
      if (data.length == 0) {
        this.isEmpty = false;
      }
      this.comments = data.reverse();
    });

    const { _id }: any = this.userService.user;
    this.ownerID = _id;
  }
  remove() {
    const id = this.route.snapshot.params['id'];

    this.service.remove(id).subscribe(() => {
      this.router.navigate(['/gallery']);
    });
  }

  like() {
    const { _id }: any = this.userService.user;
    const sneakersid = this.route.snapshot.params['id'];
    this.service.like(sneakersid, _id).subscribe({
      next: (newSneakers) => {
        this.sneakers = newSneakers;
        this.isLiked = true;
      },
    });
  }

  addToBasket() {
    const { _id }: any = this.userService.user;
    const sneakersid = this.route.snapshot.params['id'];
    this.userService.addSneakersToBasket(_id, sneakersid).subscribe();
  }

  toggle() {
    if (!this.clicked) {
      this.clicked = true;
    } else {
      this.clicked = false;
    }
  }

  addComment(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { comment } = form.value;
    const { username }: any = this.userService.user;
    const sneakersid = this.route.snapshot.params['id'];
    this.clicked = false;

    this.commentService
      .createComment(comment, username, sneakersid)
      .subscribe((data) => {
        this.comments = [data, ...this.comments];
        this.isEmpty = true;
      });
  }
}
