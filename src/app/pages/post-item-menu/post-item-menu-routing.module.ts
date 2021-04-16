import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostItemMenuPage } from './post-item-menu.page';
import { BagComponent } from '../post-items/bag/bag.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';

const routes: Routes = [
  {
    path: '',
    component: PostItemMenuPage,
  },
  {
    path: 'bag',
    component: BagComponent
  },
  {
    path: 'contact-form',
    component: ContactFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostItemMenuPageRoutingModule {}
