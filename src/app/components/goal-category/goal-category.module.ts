import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';

import { RouterModule } from '@angular/router';
import { GoalCategoryComponent } from './goal-category.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule.forChild(),
    RouterModule,
  ],
  declarations: [GoalCategoryComponent],
  exports: [GoalCategoryComponent],
})
export class GoalCategoryModule {}
