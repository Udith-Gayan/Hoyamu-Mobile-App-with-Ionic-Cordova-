import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }


  postRequest(url: string, body: any, options: any = null){
    if(options == null){
      return this.http.post(url, body);
    }
    return this.http.post(url, body, options);
  }
}
