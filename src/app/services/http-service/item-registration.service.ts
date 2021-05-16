import { ItemCategoryType } from './../../Common_Components/enums/ItemCategoryEnum';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class ItemRegistrationService {

  private baseUrl: string = 'http://56f42ebf7b10.ngrok.io/api/PostItem/';   // correct this
  // run ngrok http 8915 -host-header=localhost:8915

  constructor(private httpService: HttpService, private storage: NativeStorage) { }

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


 /**
  * 
  * @param imagePath string eg: file://........
  * @param imageName name + extention
  * @param bodyData object
  * @param mainCategory enum ItemCategoryType
  */
 registerItemNative(imagePath: string, imageName: string,  bodyData: any, mainCategory: ItemCategoryType ){
  console.log("33");
 //Add if else block for item categories
 if(mainCategory == ItemCategoryType.Bag){
   return this.registerBagNative(imagePath, imageName, bodyData);
 } else {
   return null;
 }
}

  private registerBag(formData: FormData) {
   const url = this.baseUrl + 'bagItem';
   console.log("bag found");
   this.httpService.postRequest(url, formData)
   .then(
     res => {
       alert('res came');
       alert(res)
       console.log(res);

     })
     .catch(
      err => {
        alert('Error came');
        // Pass this whole error to common error popup show service
        alert(err);
      }
     ).finally(() => {
      this.storage.clear();  // Remove only the image and item  - Fix
     });

  }

  private registerBagNative(imagePath: string, imageName: string,  bodyData: any) {
    const url = this.baseUrl + 'bagItem';
    console.log(imagePath);
    this.httpService.uploadFile(url,imagePath, imageName, bodyData)
    .then(
      res => {
        alert('res came');
        alert(res)
        console.log(res);
 
      })
      .catch(
       err => {
         alert('Error came');
         // Pass this whole error to common error popup show service
         alert(err.error);
         console.log(err);
       }
      ).finally(() => {
        this.storage.clear();  // Remove only the image and item  - Fix
       });;
 
   }




}
