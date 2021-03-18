import {Component, ViewChild} from '@angular/core';
import {IonSlides, NavController} from '@ionic/angular';

import {SwiperOptions} from 'swiper';

import {set} from 'idb-keyval';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage {
  @ViewChild('introSlider', {static: true}) private slider: IonSlides;

  sliderOptions: SwiperOptions = {
    effect: 'slide',
    zoom: false,
  };

  lastSlide = false;

  water = false;
  grow = false;

  transition = false;

  constructor(private navController: NavController) {}

  async next() {
    if (!this.slider) {
      return;
    }

    try {
      const end: boolean = await this.slider.isEnd();

      if (end) {
        await this.navigate();
      } else {
        await this.slider.slideNext();
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
      this.lastSlide = await this.slider.isEnd();
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
}
