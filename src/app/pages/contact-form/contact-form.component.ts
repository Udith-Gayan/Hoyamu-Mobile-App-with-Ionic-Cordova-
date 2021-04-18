import { Component, OnInit } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { ContactDto } from 'src/app/Dto/contact.model';
import { Item, ItemSubmitDto } from 'src/app/Dto/item-submit.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {

  constructor(public keyboard: Keyboard) { }

  ngOnInit() {
    this.item.item = new Item();
    this.item.contact = new ContactDto();
  }

  item: ItemSubmitDto = new ItemSubmitDto();
  isFormFieldsValid = false;
  errorMessage: string = '';


  onPostItem() {
    console.log("Post button clicked");
    if(this.isContactFormFieldsValid()) {
      // Show success comppetions
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
