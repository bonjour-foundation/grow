import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { get } from 'idb-keyval';

@Injectable({
  providedIn: 'root',
})
export class IntroGuard {
  constructor(private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean | UrlTree> {
    const introDone: boolean = await get('intro_done');

    if (introDone) {
      return true;
    } else {
      return this.router.parseUrl('/intro');
    }
  }
}
