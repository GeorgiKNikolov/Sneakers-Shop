import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserForAuth } from '../types/user';
import { BehaviorSubject, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);
  private user$ = this.user$$.asObservable();

  user: UserForAuth | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.user$.subscribe((user) => {
      console.log(user);

      this.user = user;
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<UserForAuth>('/api/login', { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  registger(
    username: string,
    email: string,
    tel: string,
    image: string,
    password: string,
    rePassword: string
  ) {
    return this.http
      .post<UserForAuth>('/api/register', {
        username,
        email,
        tel,
        image,
        password,
        rePassword,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }
  getProfile() {
    return this.http
      .get<UserForAuth>('/api/profile')
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    console.log('Attempting to logout...');
    return this.http
      .post('/api/logout', {})
      .pipe(tap((data) => {console.log(data);
       this.user$$.next(null)}));
  }

  addSneakersToBasket(userId: string, sneakersid: string) {
    return this.http.post<UserForAuth>(`/api/basket/${userId}`, {
      sneakersid,
    });
  }
  getBasket(userId: string) {
    return this.http.get<User>(`/api/basket/${userId}`);
  }

  removeItemFromBasket(userId: string, sneakersId: string) {
    return this.http.put<User>(`/api/basket/${userId}`, {
      sneakersId,
    });
  }
  completeOrder(userId: string) {
    return this.http.put<User>('/api/complete-order', {
      userId,
    });
  }

  editUserInfo(userId: string, editInfo: {}) {
    console.log(userId);
    console.log(editInfo);

    return this.http.put<UserForAuth>(
      `/api/edit-user-info/${userId}`,
      editInfo
    );
  }
}
