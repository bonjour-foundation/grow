import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { map, Observable } from 'rxjs';

import { GoalsService } from '../../../../services/goals/goals.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: false,
})
export class ListPage {
  category: string;

  goals$: Observable<string[]>;

  selected: string | undefined = undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private goalsService: GoalsService,
  ) {}

  ionViewWillEnter() {
    this.selected = undefined;

    this.category = this.activatedRoute.snapshot.paramMap.get('category');

    this.goals$ = this.goalsService.goals$.pipe(
      map((goals: Record<string, string[]>) => goals[this.category]),
    );
  }

  select(goal: string) {
    this.selected = goal;

    setTimeout(async () => {
      await this.navController.navigateForward(
        [`/goal/${this.category}/${this.selected}`],
        { animated: true },
      );
    }, 250);
  }
}
