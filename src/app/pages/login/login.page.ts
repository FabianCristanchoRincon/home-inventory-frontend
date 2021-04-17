import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { WishService } from '../../services/list.service';
import { Storage } from "@ionic/storage"


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private userService: UserService,
    private listService: WishService,
    private router :Router, 
    private fb: FormBuilder, 
    private alertCtrl: AlertController,
    private storage:Storage) {
      console.log("borrar token")
    this.loginForm = this.fb.group({
    //  email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit() {
    console.log("borrar token")
    this.storage.clear();
    this.listService.lists = [];
  }

  async login() {
    this.userService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)
    .then(async (res:any)=>{
      if(res.message !== undefined){
        const alert = await this.alertCtrl.create({
          cssClass: 'alert',
          header: res.message+'',
          buttons: ['OK']
        });
        alert.present();
      }

      if(res.ok){
        this.listService.loadList(res.token)
        .then((val)=>{
          console.log(val);
          this.router.navigateByUrl("/tabs/tab1")
        }).catch((err)=>{
          console.log(err);
        });
      }else{
        const alert = await this.alertCtrl.create({
          cssClass: 'alert',
          header: 'Usuario/contraseña incorrectas. Intenta con otros datos',
          buttons: ['OK']
        });
        alert.present();
        this.loginForm.get('username').setValue('');
        this.loginForm.get('password').setValue('');
      }
    })
  }
}