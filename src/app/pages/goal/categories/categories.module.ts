import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';

import { GoalPageRoutingModule } from './categories-routing.module';

import { GoalCategoryModule } from '../../../components/goal-category/goal-category.module';
import { GoalTitleModule } from '../../../components/goal-title/goal-title.module';
import { CategoriesPage } from './categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    GoalPageRoutingModule,
    GoalTitleModule,
    GoalCategoryModule,
  ],
  declarations: [CategoriesPage],
})
export class CategoriesPageModule {}
