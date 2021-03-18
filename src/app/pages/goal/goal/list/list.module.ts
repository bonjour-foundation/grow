import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ListPageRoutingModule} from './list-routing.module';

import {ListPage} from './list.page';
import {GoalTitleModule} from '../../../../components/goal-title/goal-title.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ListPageRoutingModule, GoalTitleModule, TranslateModule.forChild()],
  declarations: [ListPage],
})
export class ListPageModule {}
