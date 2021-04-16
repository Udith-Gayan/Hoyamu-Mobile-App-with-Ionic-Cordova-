import { Item, ItemSubmitDto } from './../../../Dto/item-submit.model';
import { Component, OnInit } from '@angular/core';
import { ContactDto } from 'src/app/Dto/contact.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { PageRouterService } from 'src/app/services/page-router.service';
import { CommonConstants } from 'src/app/constants/common';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.scss'],
})
export class BagComponent implements OnInit {

  constructor(private storage: NativeStorage, private pageRouter: PageRouterService,
              private constants: CommonConstants) { }

  item: ItemSubmitDto = new ItemSubmitDto();
  isFieldsValid = false;

  async ngOnInit() {
    this.item.item = new Item();
    this.item.contact = new ContactDto();

    await this.storage.getItem(this.constants.STOREDITEM).then(value => {
      console.log(" val goes here");
      if([null,''].includes(value)){
        this.item.item = new Item();
        this.item.contact = new ContactDto();
      } else {
        this.item = <ItemSubmitDto>JSON.parse(value);
      }
    },
    reason => {
      console.log(" reason");
      this.item.item = new Item();
      this.item.contact = new ContactDto();
    });

  }

  onFoundDateChanged(event) {
    this.item.item.dateFound = event;
  }

  onImageNameChanged(imageName: string){
    if (['', null].includes(imageName.trim())) {
      this.item.item.imageNameKey = null;
    } else {
      this.item.item.imageNameKey = imageName;
      console.log("Image Name is " + this.item.item.imageNameKey);
    }
  }

  onPlaceFoundChange(){
    if (this.item.item.placeFound != null && this.item.item.placeFound !== ''){
      this.isFieldsValid = true;
    } else {
      this.isFieldsValid = false;
    }
  }

  onSubmit(){
    this.isFieldsValid = true;   // nothing to valid in bag component
    if (this.isFieldsValid) {
      // set the object to storage and go to contact page
      this.storage.setItem(this.constants.STOREDITEM, JSON.stringify(this.item));
      console.log(this.storage.getItem(this.constants.STOREDITEM));
      this.pageRouter.goTo('post-item-menu/contact-form')
    } else {
      return;
    }
  }

}
