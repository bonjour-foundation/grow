import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';

import { GoalTitleComponent } from './goal-title.component';

@NgModule({
  imports: [IonicModule, CommonModule, TranslateModule.forChild()],
  declarations: [GoalTitleComponent],
  exports: [GoalTitleComponent],
})
export class GoalTitleModule {}
