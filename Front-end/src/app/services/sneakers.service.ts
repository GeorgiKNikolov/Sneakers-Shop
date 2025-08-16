import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Sneakers } from '../types/sneakers';

@Injectable({
  providedIn: 'root',
})
export class SneakersService {
  constructor(private http: HttpClient) {}


  getAll() {
    return this.http.get<Sneakers[]>(`/api/sneakers`);
  }

  getOne(id: string) {
    return this.http.get<Sneakers>(`/api/sneakers/${id}`);
  }

  search({brand, activity}: any) {
    return this.http.get<Sneakers[]>(`/api/search`, {
      params: { brand ,activity},
    });
  }
  upload(
    activity: string,
    brand: string,
    description: string,
    material: string,
    photo: string,
    season: string,
    size: string,
    prise: string,
    technology: string,
    userId: string
  ) {
    return this.http.post<Sneakers>('/api/upload', {
      activity,
      brand,
      description,
      material,
      photo,
      season,
      size,
      prise,
      technology,
      userId,
    });
  }
  edit(id: string, data: {}) {
    return this.http.put<Sneakers>(`/api/edit/${id}`, data);
  }

  remove(id: string){
    return this.http.delete(`/api/delete/${id}`)
  }

  like(id: string, userID :string){
    return this.http.put<Sneakers>(`/api/likes/${id}`, userID)
  }

  orderedItems(sneakers: {}){
    console.log(sneakers);
    
    return this.http.post("/api/ordered", sneakers)
  }
  
}
