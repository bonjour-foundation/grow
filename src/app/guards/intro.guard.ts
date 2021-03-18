import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';

import {get} from 'idb-keyval';

@Injectable({
  providedIn: 'root',
})
export class IntroGuard implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const introDone: boolean = await get('intro_done');

    if (introDone) {
      return true;
    } else {
      return this.router.parseUrl('/intro');
    }
  }
}
