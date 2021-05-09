import { ItemCategoryType } from './../../Common_Components/enums/ItemCategoryEnum';
import { Component, OnInit } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { CommonConstants } from 'src/app/constants/common';
import { ContactDto } from 'src/app/Dto/contact.model';
import { Item, ItemSubmitDto } from 'src/app/Dto/item-submit.model';
import { BlobService } from 'src/app/services/blob.service';
import { ItemRegistrationService } from 'src/app/services/http-service/item-registration.service';
import { PageRouterService } from 'src/app/services/page-router.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {

  constructor(public keyboard: Keyboard, private storage: NativeStorage, private pageRouter: PageRouterService,
    private constants: CommonConstants, private blobService: BlobService,
    private registerService : ItemRegistrationService) { }

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

  item: ItemSubmitDto = new ItemSubmitDto();
  isFormFieldsValid = false;
  errorMessage: string = '';
  formData: FormData = new FormData();


  async onPostItem() {
    console.log("Post button clicked");
    if(this.isContactFormFieldsValid()) {
      // Show success comppetions
      await this.storage.getItem(this.item.item.imageNameKey).then(imageString => {
        let imageBlob = this.blobService.dataURItoBlob(imageString);
        this.formData.append("image", imageBlob);
        this.formData.append("item", JSON.stringify(this.item.item));
        this.formData.append("contact", JSON.stringify(this.item.contact));
        this.formData.append("mainCategoryType", this.item.item.mainCategoryType.toString());
        this.registerService.registerItem(this.formData, ItemCategoryType.Bag);
      }, err => {
        console.log(err);
      });

    } else {
      console.log(this.errorMessage);
      return;
    }
  }

  isContactFormFieldsValid() {
    this.isFormFieldsValid = true;

    this.item.contact.name = this.item.contact.name.trim();
    this.item.contact.email = this.item.contact.email.trim();
    this.item.contact.mobileNumber = this.item.contact.mobileNumber.trim();
    this.item.contact.extraNote = this.item.contact.extraNote.trim();

    if(this.item.contact.name.length == 0) {
      this.isFormFieldsValid = false;
      this.errorMessage = "Name is required";
      return this.isFormFieldsValid;
    } else if (this.item.contact.mobileNumber.length == 0 && this.item.contact.email.length == 0){
      this.isFormFieldsValid = false;
      this.errorMessage = "Either Email or Telephone number is required";
      return this.isFormFieldsValid;
    } else if(this.item.contact.mobileNumber.length > 0 && this.item.contact.email.length > 0) {
      // check both email and number using regular expressions.
    } else if (this.item.contact.mobileNumber.length > 0 && this.item.contact.email.length == 0) {
      // check only number using regular expressions.
    } else if (this.item.contact.email.length > 0 && this.item.contact.mobileNumber.length == 0) {
      // check only email using regular expressions.
    }

    this.isFormFieldsValid = true;
    this.errorMessage = "";
    return true;
  }

}
