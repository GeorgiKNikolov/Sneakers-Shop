import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const AuthGuard: CanActivateFn = () => {
  const service = inject(UserService);
  const route = inject(Router);
  if (service.isLogged) {
    return true;
  }

  route.navigate(['/home']);
  return false;
};
