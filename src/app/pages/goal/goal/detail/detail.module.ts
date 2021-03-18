import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DetailPageRoutingModule} from './detail-routing.module';

import {DetailPage} from './detail.page';

import {GoalTitleModule} from '../../../../components/goal-title/goal-title.module';

import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DetailPageRoutingModule, GoalTitleModule, TranslateModule.forChild()],
  declarations: [DetailPage],
})
export class DetailPageModule {}
