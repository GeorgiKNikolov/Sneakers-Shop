import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brands } from '../types/brand';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private http: HttpClient) {}

  logo = '';

  getBrand(brand: string) {
    switch (brand) {
      case 'adidas':
        this.logo = brand;
        break;
      case 'nike':
        this.logo = brand;
        break;
      case 'puma':
        this.logo = brand;
        break;
      case 'asics':
        this.logo = brand;
        break;  
      case 'reebok':
        this.logo = brand;
        break;
    }

    return this.http.get<Brands>(`/api/brand-${this.logo}`, {
      params: { brand },
    });
  }
}
