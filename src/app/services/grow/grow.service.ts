import {Injectable} from '@angular/core';

import {Observable, ReplaySubject} from 'rxjs';
import {take} from 'rxjs/operators';

import {get, set} from 'idb-keyval';

export interface Grow {
  water: boolean;
  level: number;
  msg: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GrowService {
  private grow: ReplaySubject<Grow> = new ReplaySubject(1);

  async init() {
    const level: number = await get('grow');

    this.grow.next({
      water: false,
      level: level !== undefined ? level : 1,
      msg: false,
    });
  }

  watch(): Observable<Grow> {
    return this.grow.asObservable();
  }

  next() {
    this.progress(true);
  }

  missed() {
    this.progress(false);
  }

  private progress(inc: boolean) {
    this.grow.pipe(take(1)).subscribe(async (grow: Grow) => {
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

      await this.save(nextLevel);
      this.grow.next({
        water: inc,
        level: nextLevel,
        msg: true,
      });
    });
  }

  private async save(level: number) {
    await set('grow', level);
  }
}
