import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController} from '@ionic/angular';
import { IonicSlides } from '@ionic/angular';
import Swiper from 'swiper';
import {set} from 'idb-keyval';

@Component({
    selector: 'app-intro',
    templateUrl: './intro.page.html',
    styleUrls: ['./intro.page.scss'],
    standalone: false
})
export class IntroPage {
  @ViewChild('introSlider')
  slider: ElementRef | undefined;

  swiperModules = [IonicSlides];

  lastSlide = false;

  water = false;
  grow = false;

  transition = false;

  constructor(private navController: NavController) {}

  async next() {
    try {
      const end = this.swiperInstance?.isEnd;

      if (end) {
        await this.navigate();
      } else {
        this.swiperInstance?.slideNext();
        await this.updateAnimateLastSlide();
      }
    } catch (err) {
      // Do nothing
    }
  }

  private async navigate() {
    await set('intro_done', true);
    await this.navController.navigateRoot('/categories', {animated: true});
  }

  async updateAnimateLastSlide() {
    try {
      this.lastSlide = this.swiperInstance?.isEnd;
      this.animate();
    } catch (err) {
      // Do nothing
    }

    this.transition = false;
  }

  private animate() {
    if (!this.lastSlide) {
      return;
    }

    if (this.water || this.grow) {
      return;
    }

    setTimeout(() => {
      this.water = true;

      setTimeout(() => {
        this.grow = true;

        setTimeout(() => {
          this.water = false;
        }, 1000);
      }, 1500);
    }, 250);
  }

  private get swiperInstance(): Swiper | undefined {
    return this.slider?.nativeElement.swiper;
  }
}
