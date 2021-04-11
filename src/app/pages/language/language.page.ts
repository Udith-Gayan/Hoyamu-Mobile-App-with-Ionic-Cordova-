
import { Component, OnInit } from '@angular/core';
import { PageRouterService } from 'src/app/services/page-router.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {

  constructor(private pageRouter: PageRouterService,
              public toastController: ToastController) { }

  ngOnInit() {
  }

  onEnglishSelected() {
    this.pageRouter.goTo('dashboard');
  }

  onSinhalaSelected() {
    this.pageRouter.goTo('dashboard');
  }

  async showToastMessage(message: string, colour: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      color: colour,
      position: "bottom",
    });
    toast.present();
  }

}
