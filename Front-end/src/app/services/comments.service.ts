import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comments } from '../types/comments';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  createComment(data: string, owner: string, sneakersId: string) {
    return this.http.post<Comments>('/api/comment', {
      data,
      owner,
      sneakersId,
    });
  }
  getComments(id: string) {
    return this.http.get<Comments[]>(`/api/comment/${id}`);
  }
}
