import { ContactFormComponent } from './../contact-form/contact-form.component';
import { BagComponent } from './../post-items/bag/bag.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostItemMenuPageRoutingModule } from './post-item-menu-routing.module';
import { PageRouterService } from 'src/app/services/page-router.service';

import { PostItemMenuPage } from './post-item-menu.page';
import { SearchBarComponent } from 'src/app/Common_components/search-bar/search-bar.component';
import { DatePickerComponent } from 'src/app/Common_components/date-picker/date-picker.component';
import { ImgUploaderComponent } from 'src/app/Common_components/img-uploader/img-uploader.component';

@NgModule({
  entryComponents: [DatePickerComponent, BagComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostItemMenuPageRoutingModule
  ],
  declarations: [PostItemMenuPage, SearchBarComponent, DatePickerComponent, ImgUploaderComponent,
                 BagComponent,
                 ContactFormComponent],
  providers: [PageRouterService]
})
export class PostItemMenuPageModule {}
