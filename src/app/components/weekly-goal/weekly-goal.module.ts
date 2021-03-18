import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {TranslateModule} from '@ngx-translate/core';

import {WeeklyGoalComponent} from './weekly-goal.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [IonicModule, CommonModule, TranslateModule.forChild(), RouterModule],
  declarations: [WeeklyGoalComponent],
  exports: [WeeklyGoalComponent],
})
export class WeeklyGoalModule {}
