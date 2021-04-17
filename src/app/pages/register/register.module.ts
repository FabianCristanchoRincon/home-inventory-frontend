import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {
  storageToken: string = '';


  constructor(private http: HttpClient, private storage: Storage) {
    // storage.get('token').then((val)=>{
    //   this.storageToken = atob(val);
    // });
  }
}
