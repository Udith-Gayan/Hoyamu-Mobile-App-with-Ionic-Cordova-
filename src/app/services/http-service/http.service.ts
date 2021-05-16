import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private httpNative: HTTP) { }


  // postRequest(url: string, body: any, options: any = null){
  //   console.log("req sent");
  //   if(options == null){
  //     console.log("req sent");
  //     return this.http.post(url, body);
  //   }
  //   return this.http.post(url, body, options);
  // }

  postRequest(url: string, body: any, options: any = null){
    alert("req sent");
    this.httpNative.setDataSerializer("multipart");
    if(options == null){
      return this.httpNative.post(url, body, null);
    }
    return this.httpNative.post(url, body, options);
    
  }

  uploadFile(url: string, filepath: string, filename: string, body: any, options: any = null){
    alert("upload req sent");
    return this.httpNative.uploadFile(url,body,options,filepath,filename);
  }
}
