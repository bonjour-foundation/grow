import {Injectable} from '@angular/core';

import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MsgService {
  private msgSubject: Subject<string> = new Subject();
  readonly msg$: Observable<string> = this.msgSubject.asObservable();

  private errorSubject: Subject<string> = new Subject();
  readonly error$: Observable<string> = this.errorSubject.asObservable();

  msg(content: string) {
    this.msgSubject.next(content);
  }

  error(content: string) {
    this.errorSubject.next(content);
  }
}
