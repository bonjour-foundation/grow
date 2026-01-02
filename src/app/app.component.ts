import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ToastController} from '@ionic/angular';
import { register } from 'swiper/element/bundle';

import {catchError, forkJoin, from, Observable, Subject, takeUntil} from 'rxjs';

import {MsgService} from './services/msg/msg.service';
import {GoalsService} from './services/goals/goals.service';
import {GrowService} from './services/grow/grow.service';

import {SplashScreen} from '@capacitor/splash-screen';

register();

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private toastController: ToastController,
    private translateService: TranslateService,
    private goalsService: GoalsService,
    private growService: GrowService,
    private msgService: MsgService
  ) {}

  async ngOnInit() {
    this.initializeTranslateServiceConfig();

    forkJoin([this.initGoal(), this.initGrow()])
      .pipe(takeUntil(this.destroy$))
      .subscribe(async () => await SplashScreen.hide());

    this.msgService.msg$.pipe(takeUntil(this.destroy$)).subscribe(async (msg: string) => {
      await this.presentMsgToast(msg);
    });

    this.msgService.error$.pipe(takeUntil(this.destroy$)).subscribe(async (error: string) => {
      await this.presentMsgToast(error, 'danger');
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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

  private initGoal(): Observable<void> {
    return this.goalsService.init().pipe(catchError(() => from(this.presentMsgToast('ERROR.GOAL_NOT_LOADED'))));
  }

  private initGrow() {
    return this.growService.init().pipe(catchError(() => from(this.presentMsgToast('ERROR.GROW_NOT_LOADED'))));
  }
}
