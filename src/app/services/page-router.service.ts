import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageRouterService {

  constructor(private router: Router) { }

  goTo(path1: string, path2: string = '') {
    if (path2 !== '')
    {
      this.router.navigate([path1, path2]);
    } else {
      this.router.navigate([path1]);

    }
  }

  getMyCurrentURL() {
    return this.router.url;
  }
}
