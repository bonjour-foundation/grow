import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {HomePage} from './home.page';
import {WeeklyGoalModule} from '../../components/weekly-goal/weekly-goal.module';
import {FlowerModule} from '../../components/flower/flower.module';
import {OpenInfoModule} from '../../components/open-info/open-info.module';

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
