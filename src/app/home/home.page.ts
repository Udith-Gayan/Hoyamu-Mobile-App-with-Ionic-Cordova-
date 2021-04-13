import { Component, AfterViewInit } from '@angular/core';

import { Router } from '@angular/router';

import { Network } from '@ionic-native/network/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ToastController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

  constructor(private router: Router, public network: Network, private screenOrientation: ScreenOrientation, private splashScreen: SplashScreen,
              public toastController: ToastController, private platform : Platform) {}

  ngAfterViewInit(): void {

    

    let offlineToast: HTMLIonToastElement = null;

    // watch network for a disconnect
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showToastMessage('You are appear to be offline. Please try again!.', 'dark', 300000).then(toast => {offlineToast = toast;});
    });

    // stop disconnect watch
    // disconnectSubscription.unsubscribe();

    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {

      if(offlineToast != null) {
        this.toastController.dismiss();
        this.showToastMessage('Internet Available', 'success', 10000);
      }


      if(this.router.url == '/home' || this.router.url == ''){
        this.gotoLanguagePage();
      }

    });

    // stop connect watch
    // connectSubscription.unsubscribe();


  }

  async showToastMessage(message: string, colour: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      color: colour,
      position: "bottom",
      mode: "ios",
      buttons: [
        {
          text: 'X',
          role: 'cancel'
        }
      ]
    });
    toast.present();

    return (toast);
  }

  gotoLanguagePage() {
    setTimeout(() => {
      this.router.navigate(['/language']);
    }, 3000);
  }


}
