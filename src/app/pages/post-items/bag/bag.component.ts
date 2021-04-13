import { Item, ItemSubmitDto } from './../../../Dto/item-submit.model';
import { Component, OnInit } from '@angular/core';
import { ContactDto } from 'src/app/Dto/contact.model';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.scss'],
})
export class BagComponent implements OnInit {

  constructor() { }

  item: ItemSubmitDto = new ItemSubmitDto();
  isFieldsValid = false;

  ngOnInit() {
    this.item.item = new Item();
    this.item.contact = new ContactDto();
  }

  onFoundDateChanged(event) {
    this.item.item.dateFound = event;
  }

  onImageNameChanged(imageName: string){
    if (['', null].includes(imageName.trim())) {
      this.item.item.imageNameKey = null;
    } else {
      this.item.item.imageNameKey = imageName;
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
    if (this.isFieldsValid) {
      // set the object to storage and go to contact page
    } else {
      return;
    }
  }

}
