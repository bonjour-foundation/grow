import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {TranslateModule} from '@ngx-translate/core';

import {FlowerComponent} from './flower.component';

@NgModule({
  imports: [IonicModule, CommonModule, TranslateModule.forChild()],
  declarations: [FlowerComponent],
  exports: [FlowerComponent],
})
export class FlowerModule {}
