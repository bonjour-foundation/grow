import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  animate = false;

  ionViewDidEnter() {
    this.delayAnimation();
  }

  private delayAnimation() {
    setTimeout(() => {
      this.animate = true;
    }, 10);
  }
}
