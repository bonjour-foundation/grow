import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {Grow, GrowService} from '../../services/grow/grow.service';

@Component({
  selector: 'app-flower',
  templateUrl: './flower.component.html',
  styleUrls: ['./flower.component.scss'],
})
export class FlowerComponent implements OnInit, OnDestroy {
  grow: number;

  water = false;

  info = false;
  msg: 'achieved' | 'missed';

  private subscription: Subscription;

  constructor(private growService: GrowService) {}

  ngOnInit() {
    this.subscription = this.growService.grow$.subscribe((grow: Grow) => {
      this.water = grow.water;

      setTimeout(
        () => {
          this.info = grow.msg;
          this.msg = grow.water ? 'achieved' : 'missed';
        },
        grow.water ? 250 : 500
      );

      setTimeout(
        () => {
          this.grow = grow.level;
          this.water = false;

          this.info = false;
        },
        this.grow === undefined ? 150 : 5000
      );
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
