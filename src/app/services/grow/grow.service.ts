import { Injectable } from '@angular/core';

import {
  first,
  from,
  map,
  Observable,
  of,
  ReplaySubject,
  switchMap,
  tap,
} from 'rxjs';

import { get, set } from 'idb-keyval';

export interface Grow {
  water: boolean;
  level: number;
  msg: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GrowService {
  private growSubject: ReplaySubject<Grow> = new ReplaySubject(1);
  readonly grow$: Observable<Grow> = this.growSubject.asObservable();

  init(): Observable<void> {
    return from(get('growSubject')).pipe(
      tap((level: number) =>
        this.growSubject.next({
          water: false,
          level: level !== undefined ? level : 1,
          msg: false,
        }),
      ),
      switchMap(() => of(void 0)),
    );
  }

  next(): Observable<void> {
    return this.progress(true);
  }

  missed(): Observable<void> {
    return this.progress(false);
  }

  private progress(inc: boolean): Observable<void> {
    return this.growSubject.pipe(
      first(),
      map((grow: Grow) => {
        {
          let nextLevel: number = inc ? grow.level + 1 : grow.level - 1;

          if (inc) {
            if (grow.level === 4) {
              nextLevel = 4;
            } else if (grow.level >= 5) {
              nextLevel = grow.level - 1;
            }
          }

          if (!inc) {
            if (grow.level === 4) {
              nextLevel = 5;
            } else if (grow.level >= 5) {
              nextLevel = 6;
            } else if (nextLevel < 1) {
              nextLevel = 1;
            }
          }

          return nextLevel;
        }
      }),
      switchMap((nextLevel: number) =>
        from(this.save(nextLevel)).pipe(switchMap(() => of(nextLevel))),
      ),
      tap((nextLevel: number) =>
        this.growSubject.next({
          water: inc,
          level: nextLevel,
          msg: true,
        }),
      ),
      switchMap(() => of(void 0)),
    );
  }

  private async save(level: number) {
    await set('growSubject', level);
  }
}
