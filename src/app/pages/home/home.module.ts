import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { FlowerModule } from '../../components/flower/flower.module';
import { OpenInfoModule } from '../../components/open-info/open-info.module';
import { WeeklyGoalModule } from '../../components/weekly-goal/weekly-goal.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
      },
    ]),
    WeeklyGoalModule,
    FlowerModule,
    OpenInfoModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
