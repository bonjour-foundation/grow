import {Injectable} from '@angular/core';

import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MsgService {
  private msgSubject: Subject<string> = new Subject();

  private errorSubject: Subject<string> = new Subject();

  constructor() {}

  watchMsg(): Observable<string> {
    return this.msgSubject.asObservable();
  }

  watchError(): Observable<string> {
    return this.errorSubject.asObservable();
  }

  msg(content: string) {
    this.msgSubject.next(content);
  }

  error(content: string) {
    this.errorSubject.next(content);
  }
}
