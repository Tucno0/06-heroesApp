import { Injectable, inject } from '@angular/core';
import { Observable, pipe, tap } from 'rxjs';
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
      tap ( isAuthenticated => console.log('Auth Authenticated', isAuthenticated)),
      tap( isAuthenticate => {
        if(!isAuthenticate) {
          router.navigate(['./auth/login']);
        }
      }),
    )
}

// export const canMatchGuard: CanMatchFn = (
//   route: Route,
//   segments: UrlSegment[]
// ): boolean | Observable<boolean> => {
//   // console.log('CanMatch');
//   // console.log({ route, segments });
//   return checkAuthStatus;
// };

// export const canActivateGuard: CanActivateFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ): boolean | Observable<boolean> => {
//   // console.log('CanActivate');
//   // console.log({ route, state });
//   return checkAuthStatus;
// };

export const AuthCanMatchGuard: CanMatchFn = checkAuthStatus;
export const AuthCanActivateGuard: CanActivateFn = checkAuthStatus;


