import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ErrorPage404Component } from './error/error-page-404/error-page-404.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SearchComponent } from './search/search.component';
import { SneakersListComponent } from './sneakers/sneakers-list/sneakers-list.component';
import { BasketComponent } from './basket/basket.component';
import { DetailsComponent } from './sneakers/details/details.component';
import { UploadComponent } from './sneakers/upload/upload.component';
import { AuthGuard } from './guards/auth-guards';
import { BrandsListComponent } from './brands-list/brands-list.component';
import { EditComponent } from './sneakers/edit/edit.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { EditUserInfoComponent } from './user/edit-user-info/edit-user-info.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: MainComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search',
    children: [
      { path: '', component: SearchComponent },
      {
        path: ':id',
        component: DetailsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'upload',
    component: UploadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gallery',
    children: [
      { path: '', component: SneakersListComponent },
      {
        path: ':id',
        component: DetailsComponent,
        canActivate: [AuthGuard],
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'brands-adidas',
    component: BrandsListComponent,
  },
  {
    path: 'brands-nike',
    component: BrandsListComponent,
  },
  {
    path: 'brands-reebok',
    component: BrandsListComponent,
  },
  {
    path: 'brands-puma',
    component: BrandsListComponent,
  },
  {
    path: 'brands-asics',
    component: BrandsListComponent,
  },
  {
    path: 'basket/:userId',
    component: BasketComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order',
    component: OrderViewComponent,
  },
  {
    path: 'edit-user-info/:id',
    component: EditUserInfoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '404',
    component: ErrorPage404Component,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
