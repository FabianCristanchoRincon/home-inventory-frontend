import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  title = 'REGISTER';


  constructor(private userService: UserService, private navCtrl: NavController, public fb: FormBuilder, private alertCtrl: AlertController) {
    this.registerForm = this.fb.group({
      name: ['', [ Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
  }

 async register() {
    const USER: User = {
      name: this.registerForm.get('name')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      email: this.registerForm.get('email')?.value,
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
    }

    const valid:any = await this.userService.register(USER.name, USER.lastName, USER.email, USER.username, USER.password, 'avatar.png')
    if (valid) {
      
      const alert = await this.alertCtrl.create({
        cssClass: 'alert',
        header: valid.message+'',
        buttons: ['OK']
      });
      alert.present();
      if(valid.ok){
        this.navCtrl.navigateRoot('login', { animated: true })
      }
    }else{
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: valid.message+'',
        buttons: ['OK']
      });
      alert.present();
    }
    
  }


}