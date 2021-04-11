import { Component } from '@angular/core';

import { Network } from '@ionic-native/network/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ToastController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( private screenOrientation: ScreenOrientation, private splashScreen: SplashScreen,
              private platform : Platform) {

    this.platform.ready().then(() => {
      this.splashScreen.hide();

      // set to Portrait and lock
         this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

    });

  }


}
