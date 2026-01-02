import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';

import { RouterModule } from '@angular/router';
import { WeeklyGoalComponent } from './weekly-goal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule.forChild(),
    RouterModule,
  ],
  declarations: [WeeklyGoalComponent],
  exports: [WeeklyGoalComponent],
})
export class WeeklyGoalModule {}
