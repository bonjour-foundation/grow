import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ToastController} from '@ionic/angular';

import {Subscription} from 'rxjs';

import {MsgService} from './services/msg/msg.service';
import {GoalsService} from './services/goals/goals.service';
import {GrowService} from './services/grow/grow.service';

import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private msgSubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(
    private toastController: ToastController,
    private translateService: TranslateService,
    private goalsService: GoalsService,
    private growService: GrowService,
    private msgService: MsgService
  ) {}

  async ngOnInit() {
    this.initializeTranslateServiceConfig();

    const initServices: Promise<void>[] = [this.initGoal(), this.initGrow()];
    await Promise.all(initServices);

    await this.initGoal();

    this.msgSubscription = this.msgService.watchMsg().subscribe(async (msg: string) => {
      await this.presentMsgToast(msg);
    });

    this.errorSubscription = this.msgService.watchError().subscribe(async (error: string) => {
      await this.presentMsgToast(error, 'danger');
    });

    await SplashScreen.hide();
  }

  private initializeTranslateServiceConfig() {
    let userLang: string = this.translateService.getBrowserLang();
    userLang = /(de|en)/gi.test(userLang) ? userLang : 'en';

    this.translateService.addLangs(['en', 'de', 'fr']);
    this.translateService.setDefaultLang('en');
    this.translateService.use(userLang);
  }

  private async presentMsgToast(msg: string, color?: string) {
    const toast = await this.toastController.create({
      message: this.translateService.instant(msg),
      duration: 2000,
      color,
    });

    await toast.present();
  }

  private async initGoal() {
    try {
      await this.goalsService.init();
    } catch (err) {
      this.presentMsgToast('ERROR.GOAL_NOT_LOADED');
    }
  }

  private async initGrow() {
    try {
      await this.growService.init();
    } catch (err) {
      this.presentMsgToast('ERROR.GROW_NOT_LOADED');
    }
  }
}
