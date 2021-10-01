import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

import {TranslateModule} from '@ngx-translate/core';

import {OpenInfoComponent} from './open-info.component';

@NgModule({
  imports: [IonicModule, RouterModule, CommonModule, TranslateModule.forChild()],
  declarations: [OpenInfoComponent],
  exports: [OpenInfoComponent],
})
export class OpenInfoModule {}
