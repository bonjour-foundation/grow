import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-goal-title',
  templateUrl: './goal-title.component.html',
  styleUrls: ['./goal-title.component.scss'],
  standalone: false,
})
export class GoalTitleComponent {
  @Input()
  icon: string;

  @Input()
  title: string;

  @Input()
  subTitle: string;
}
