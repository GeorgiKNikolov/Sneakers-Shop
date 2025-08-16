import { Component } from '@angular/core';
import { SneakersService } from '../services/sneakers.service';
import { Sneakers } from '../types/sneakers';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  sneakers: Sneakers[] = [];

  constructor(private service: SneakersService) {}

  onSearch(brand: string, activity: string) {

    this.service.search({brand, activity}).subscribe(data=>{
      this.sneakers =data
      
    })
  
  }
}
