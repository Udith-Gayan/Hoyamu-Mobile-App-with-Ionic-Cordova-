import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Observable } from 'rxjs';
import { CommonConstants } from 'src/app/constants/common';
import { PageRouterService } from '../../page-router.service';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ShowLanguagePageService implements CanActivate {

  constructor(private storage: NativeStorage, private pageRouter: PageRouterService,
              private constants: CommonConstants,
              public platform: Platform) { 

  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Promise<boolean> {
    
    let allowRoute = false

    await this.platform.ready().then(async (dr) => {

      // Remove this language set function and set it in language page
      await this.storage.setItem(this.constants.LANGUAGE, this.constants.SINHALA).then(res => {
        alert("stored Language");
      }, err => {
        alert(err);
      });

      
      let langPromise = this.storage.getItem(this.constants.LANGUAGE);
      await langPromise.then(lang => {
        if(lang == this.constants.ENGLISH || lang == this.constants.SINHALA){
          allowRoute =  true;
          return true;          
        } else { // lang value is not proper
          allowRoute =  false;
          this.pageRouter.goTo('/language');  // go  to language page
        }
      }, err => {
      console.warn(err.message);
      this.pageRouter.goTo('/language');  // go  to language page
      allowRoute =  false;
      });
      

    });

    return allowRoute;  //should be false
  }
}
