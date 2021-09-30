import {Injectable} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';

import {addDays} from 'date-fns';

import {PendingResult, LocalNotifications} from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private translateService: TranslateService) {}

  async schedule() {
    await LocalNotifications.requestPermissions();

    const title: string = this.translateService.instant('NOTIFICATION.TITLE');
    const body: string = this.translateService.instant('NOTIFICATION.BODY');

    const when: Date = addDays(new Date(), 7);

    await LocalNotifications.schedule({
      notifications: [
        {
          title,
          body,
          id: 1,
          schedule: {at: when},
        },
      ],
    });
  }

  async reset() {
    const pending: PendingResult = await LocalNotifications.getPending();

    if (!pending || !pending.notifications || pending.notifications.length <= 0) {
      return;
    }

    await LocalNotifications.cancel(pending);
  }
}
