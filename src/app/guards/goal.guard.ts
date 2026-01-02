import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GoalGuard {
  constructor(private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean | UrlTree> {
    if (
      !next ||
      !next.params ||
      !next.params['category'] ||
      next.params['category'] === undefined ||
      next.params['category'] === ''
    ) {
      return this.router.parseUrl('/categories');
    } else {
      return true;
    }
  }
}
