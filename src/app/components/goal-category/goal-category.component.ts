import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-goal-category',
  templateUrl: './goal-category.component.html',
  styleUrls: ['./goal-category.component.scss'],
})
export class GoalCategoryComponent {
  @Input()
  icon: string;

  @Input()
  title: string;

  @Input()
  category: string;

  constructor(private navController: NavController) {}

  async navigate() {
    await this.navController.navigateForward(['/goal', this.category]);
  }
}
