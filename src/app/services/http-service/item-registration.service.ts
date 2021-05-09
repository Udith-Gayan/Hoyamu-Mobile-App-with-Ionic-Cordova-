import { ItemCategoryType } from './../../Common_Components/enums/ItemCategoryEnum';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ItemRegistrationService {

  private baseUrl: string = 'http://192.168.1.101:8915/api/PostItem/';   // correct this

  constructor(private httpService: HttpService) { }

/**
 * @param formData is the data form object
 * @param mainCategory enum of the category type
 */
 registerItem(formData : FormData, mainCategory: ItemCategoryType){
   //Add if else block for item categories
   if(mainCategory == ItemCategoryType.Bag){
     return this.registerBag(formData);
   } else {
     return null;
   }
 }

 private registerBag(formData: FormData) {
   const url = this.baseUrl + 'bagItem';

   this.httpService.postRequest(url, formData)
   .subscribe(
     res => {
       console.log(res);

     },
     err => {
       // Pass this whole error to common error popup show service
       console.warn(err);
     });

 }




}
