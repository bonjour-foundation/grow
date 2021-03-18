import {Injectable} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';

import {addDays} from 'date-fns';

import {Plugins} from '@capacitor/core';
import {LocalNotificationPendingList} from '@capacitor/core/dist/esm/core-plugin-definitions';
const {LocalNotifications} = Plugins;

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private translateService: TranslateService) {}

  async schedule() {
    await LocalNotifications.requestPermission();

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
    const pending: LocalNotificationPendingList = await LocalNotifications.getPending();

    if (!pending || !pending.notifications || pending.notifications.length <= 0) {
      return;
    }

    await LocalNotifications.cancel(pending);
  }
}
