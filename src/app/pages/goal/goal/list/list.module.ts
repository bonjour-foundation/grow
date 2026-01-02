import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPageRoutingModule } from './list-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { GoalTitleModule } from '../../../../components/goal-title/goal-title.module';
import { ListPage } from './list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPageRoutingModule,
    GoalTitleModule,
    TranslateModule.forChild(),
  ],
  declarations: [ListPage],
})
export class ListPageModule {}
