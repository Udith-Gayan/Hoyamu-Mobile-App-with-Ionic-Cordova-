import { ItemCategoryType } from './../../Common_Components/enums/ItemCategoryEnum';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ItemRegistrationService {

  private baseUrl: string = 'http://35afd7c799c4.ngrok.io/api/PostItem/';   // correct this
  // run ngrok http 8915 -host-header=localhost:8915

  constructor(private httpService: HttpService) { }

/**
 * @param formData is the data form object
 * @param mainCategory enum of the category type
 */
 registerItem(formData : FormData, mainCategory: ItemCategoryType){
    console.log("2");
   //Add if else block for item categories
   if(mainCategory == ItemCategoryType.Bag){
     return this.registerBag(formData);
   } else {
     return null;
   }
 }

 private registerBag(formData: FormData) {
   const url = this.baseUrl + 'bagItem';
   console.log("bag found");
   this.httpService.postRequest(url, formData)
   .subscribe(
     res => {
       alert(res)
       console.log(res);

     },
     err => {
       // Pass this whole error to common error popup show service
       console.warn(err);
     });

 }




}
