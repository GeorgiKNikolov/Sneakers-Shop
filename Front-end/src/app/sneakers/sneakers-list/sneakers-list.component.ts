import { Component, OnInit } from '@angular/core';
import { SneakersService } from '../../services/sneakers.service';
import { Sneakers } from '../../types/sneakers';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sneakers-list',
  standalone: true,
  imports: [LoaderComponent, RouterLink],
  templateUrl: './sneakers-list.component.html',
  styleUrl: './sneakers-list.component.css',
})
export class SneakersListComponent implements OnInit {
  sneakers: Sneakers[] = [];
  isLoading = false;

  index = 0;

  constructor(private service: SneakersService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((sneaker) => {
      this.sneakers = sneaker;
      this.isLoading = true;
    });
  }
}
