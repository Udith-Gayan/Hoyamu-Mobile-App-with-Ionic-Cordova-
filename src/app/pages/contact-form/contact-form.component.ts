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
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {

  constructor(public keyboard: Keyboard, private storage: NativeStorage, private pageRouter: PageRouterService,
    private constants: CommonConstants, private blobService: BlobService,
    private registerService : ItemRegistrationService,
    private plt: Platform) { }

  formData: FormData = new FormData();
  item: ItemSubmitDto = new ItemSubmitDto();
  isFormFieldsValid = false;
  errorMessage: string = '';

   ngOnInit() {
    this.item.item = new Item();
    this.item.contact = new ContactDto();

    this.plt.ready().then( async (dr) => {

      await this.storage.getItem(this.constants.STOREDITEM).then(value => {
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

    });


  }

   onPostItem() {
    console.log("Post button clicked");
    if(this.isContactFormFieldsValid()) {

      // Show success comppetions
      let process =  this.storage.getItem(this.item.item.imageNameKey).then(imageString => {
        alert("ready for posting after retrieving data from storage");
        let imageBlob = this.blobService.dataURItoBlob(imageString);
        this.formData.append("image", imageBlob);
        this.formData.append("item", JSON.stringify(this.item.item));
        this.formData.append("contact", JSON.stringify(this.item.contact));
        this.formData.append("mainCategoryType", this.item.item.mainCategoryType.toString());
        console.log("1");
        this.registerService.registerItem(this.formData, ItemCategoryType.Bag);
      }, err => {
        alert("Errorrr for posting after retrieving data from storage");
        console.log(err);
      }).then(() => {
        alert("complted");
        this.storage.remove(this.item.item.imageNameKey);
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
