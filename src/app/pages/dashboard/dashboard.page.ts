import { PageRouterService } from 'src/app/services/page-router.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(public modalController: ModalController, private pageRouter: PageRouterService, private platform: Platform) { }

  isBackDropVisible: boolean = false;
  postMenuPath = 'post-item-menu';
  searchMenuPath = 'search-item-menu';

  backSubscription;

  ngOnInit() {
  }

  // Prevent the back button
  ionViewDidEnter() {
    this.backSubscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
    });
  }

  // Enable back button when leaving the page
  ionViewWillLeave() {
    this.backSubscription.unsubscribe();
  }


  async showFooterAlert() {
    const modal = await this.modalController.create({
      component: FooterComponent,
      cssClass: 'custom-css-for-modal-footer-in-dashboard',
      swipeToClose: true,
      mode: 'ios',
    });

    modal.onWillDismiss().then((data) => {
    this.isBackDropVisible = false;
  });

    this.isBackDropVisible = true;
    return await modal.present();
  }

  goTo(path: string) {
    this.pageRouter.goTo(path);
  }

}
