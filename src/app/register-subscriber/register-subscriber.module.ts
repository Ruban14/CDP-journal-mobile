import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterSubscriberPage } from './register-subscriber.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterSubscriberPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterSubscriberPage]
})
export class RegisterSubscriberPageModule {}
