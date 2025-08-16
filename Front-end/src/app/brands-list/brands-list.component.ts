import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SneakersService } from '../services/sneakers.service';
import { Sneakers } from '../types/sneakers';
import { LoaderComponent } from '../shared/loader/loader.component';
import { BrandService } from '../services/brand.service';
import { Brands } from '../types/brand';

@Component({
  selector: 'app-brands-list',
  standalone: true,
  imports: [LoaderComponent, RouterLink],
  templateUrl: './brands-list.component.html',
  styleUrl: './brands-list.component.css',
})
export class BrandsListComponent implements OnInit {
  sneakers: Sneakers[] = [];
  isLoading: boolean = false;
  brandLogo = [];
  logo = {} as Brands;

  constructor(
    private router: Router,
    private service: SneakersService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    let query = this.router.url;

    this.brandService.getBrand(query.slice(8)).subscribe((brand) => {
      this.brandLogo = brand as any;

     this.logo = this.brandLogo[0];
    });
 
    const brand = query.slice(8)
    const activity = ''

    this.service.search({brand, activity}).subscribe((data) => {
      console.log(data);

      this.sneakers = data;
      this.isLoading = true;
    });
  }
}
