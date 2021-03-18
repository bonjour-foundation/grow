import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {TranslateModule} from '@ngx-translate/core';

import {GoalCategoryComponent} from './goal-category.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [IonicModule, CommonModule, TranslateModule.forChild(), RouterModule],
  declarations: [GoalCategoryComponent],
  exports: [GoalCategoryComponent],
})
export class GoalCategoryModule {}
