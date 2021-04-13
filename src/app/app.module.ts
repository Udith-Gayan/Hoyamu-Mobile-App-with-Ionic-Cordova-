import { NgModule } from '@angular/core';









import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {NgxImageCompressService} from 'ngx-image-compress';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Network } from '@ionic-native/network/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
            FormsModule, BrowserAnimationsModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
              NgxImageCompressService,
              Camera,
              File,
              FilePath,
              NativeStorage,
              Network,
              ScreenOrientation,
              SplashScreen,
              WebView],
  bootstrap: [AppComponent],
})
export class AppModule {}
