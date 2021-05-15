import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }


  postRequest(url: string, body: any, options: any = null){
    console.log("req sent");
    if(options == null){
      console.log("req sent");
      return this.http.post(url, body);
    }
    return this.http.post(url, body, options);
  }
}
