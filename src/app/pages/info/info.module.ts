import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {TranslateModule} from '@ngx-translate/core';

import {InfoPageRoutingModule} from './info-routing.module';

import {InfoPage} from './info.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TranslateModule, InfoPageRoutingModule],
  declarations: [InfoPage],
})
export class InfoPageModule {}
