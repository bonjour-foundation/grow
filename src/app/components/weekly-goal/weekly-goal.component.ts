import {Component, HostBinding, Input, OnDestroy} from '@angular/core';

import {first, map, Observable, Subject, takeUntil} from 'rxjs';

import {differenceInDays} from 'date-fns';

import {TranslateService} from '@ngx-translate/core';

import {GoalsService} from '../../services/goals/goals.service';
import {GrowService} from '../../services/grow/grow.service';
import {NotificationService} from '../../services/notification/notification.service';

interface PopulateGoal extends Goal {
  expire_in: number | undefined;
}

@Component({
  selector: 'app-weekly-goal',
  templateUrl: './weekly-goal.component.html',
  styleUrls: ['./weekly-goal.component.scss'],
})
export class WeeklyGoalComponent implements OnDestroy {
  @HostBinding('class.display')
  @Input()
  display = false;

  goal$: Observable<PopulateGoal | undefined> = this.goalsService.goal$.pipe(
    map((goal: Goal | undefined) =>
        goal !== undefined
        ? {
            ...goal,
            expire_in: this.expire(goal.expire_at),
          }
        : undefined
    )
  );

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private translateService: TranslateService,
    private goalsService: GoalsService,
    private notificationService: NotificationService,
    private growService: GrowService
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private expire(input: Date | undefined): number | undefined {
    if (!input) {
      return undefined;
    }

    return differenceInDays(input, new Date());
  }

  achieved() {
    this.growService
      .next()
      .pipe(first(), takeUntil(this.destroy$))
      .subscribe(() => {
        this.animateHideDisplay();
        this.resetGoal();
      });
  }

  async missed() {
    this.growService
      .missed()
      .pipe(first(), takeUntil(this.destroy$))
      .subscribe(() => {
        this.animateHideDisplay();
        this.resetGoal();
      });
  }

  private resetGoal() {
    setTimeout(async () => {
      await this.goalsService.reset();
      await this.notificationService.reset();
    }, 1000);
  }

  private animateHideDisplay() {
    this.display = false;

    setTimeout(() => {
      this.display = true;
    }, 5750);
  }
}
