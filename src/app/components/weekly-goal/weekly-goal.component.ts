import {Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {differenceInDays} from 'date-fns';

import {TranslateService} from '@ngx-translate/core';

import {GoalsService} from '../../services/goals/goals.service';
import {GrowService} from '../../services/grow/grow.service';
import {NotificationService} from '../../services/notification/notification.service';

interface PopulateGoal extends Goal {
  expire_in: string;
}

@Component({
  selector: 'app-weekly-goal',
  templateUrl: './weekly-goal.component.html',
  styleUrls: ['./weekly-goal.component.scss'],
})
export class WeeklyGoalComponent implements OnInit, OnDestroy {
  @HostBinding('class.display')
  @Input()
  display = false;

  goal: PopulateGoal;

  private subscription: Subscription;

  constructor(
    private translateService: TranslateService,
    private goalsService: GoalsService,
    private noticiationService: NotificationService,
    private growService: GrowService
  ) {}

  ngOnInit() {
    this.subscription = this.goalsService.watch().subscribe((goal: Goal) => {
      this.goal =
        goal !== undefined
          ? {
              ...goal,
              expire_in: this.expire(goal.expire_at),
            }
          : undefined;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private expire(input: Date): string {
    if (!input) {
      return 'WEEKLY_GOAL.DAYS';
    }

    const diff: number = differenceInDays(input, new Date());
    const label: string = this.translateService.instant(diff > 1 ? 'WEEKLY_GOAL.DAYS' : 'WEEKLY_GOAL.DAY');

    return `${diff} ${label}`;
  }

  achieved() {
    this.growService.next();
    this.animateHideDisplay();
    this.resetGoal();
  }

  async missed() {
    this.growService.missed();
    this.animateHideDisplay();
    this.resetGoal();
  }

  private resetGoal() {
    setTimeout(async () => {
      await this.goalsService.reset();
      await this.noticiationService.reset();
    }, 1000);
  }

  private animateHideDisplay() {
    this.display = false;

    setTimeout(() => {
      this.display = true;
    }, 5750);
  }
}
