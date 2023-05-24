import { Injectable, inject } from '@angular/core';
import { Observable, map, pipe, tap } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard {
  constructor() { }
}

const checkAuthStatus = (): boolean | Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap ( isAuthenticated => console.log('Public Authenticated', isAuthenticated)),
      tap( isAuthenticated => {
        if(isAuthenticated) {
          router.navigate(['./']);
        }
      }),
      map( isAuthenticated => !isAuthenticated)
    )
}

export const PublicCanMatchGuard: CanMatchFn = checkAuthStatus;
export const PublicCanActivateGuard: CanActivateFn = checkAuthStatus;


