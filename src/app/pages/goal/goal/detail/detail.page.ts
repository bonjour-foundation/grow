import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NavController} from '@ionic/angular';

import {GoalsService} from '../../../../services/goals/goals.service';
import {MsgService} from '../../../../services/msg/msg.service';
import {NotificationService} from '../../../../services/notification/notification.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {
  category: string;

  goal: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private goalsService: GoalsService,
    private notificationService: NotificationService,
    private msgService: MsgService
  ) {}

  ionViewWillEnter() {
    this.goal = this.activatedRoute.snapshot.paramMap.get('goal');

    this.category = this.activatedRoute.snapshot.paramMap.get('category');
  }

  async save() {
    if (!this.goal) {
      this.msgService.msg('MSG.AT_LEAST_A_GOAL');
      return;
    }

    try {
      await this.goalsService.add(this.category, this.goal);

      await this.notificationService.schedule();

      await this.navController.navigateRoot(['/home'], {animated: true});
    } catch (err) {
      this.msgService.error('ERROR.GOAL_NOT_ADDED');
    }
  }
}
