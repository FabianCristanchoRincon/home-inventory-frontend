import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import jwt_decode from 'jwt-decode';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService} from '../../services/user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  userForm: FormGroup;
  
  storageToken: string ;
  miUsuario:any= {};



  constructor( private fb: FormBuilder,   private alertCtrl: AlertController, private storage: Storage, private userService:UserService,
    private router:Router) { 
    
    this.storage.get('token')
    .then((val) => {
     this.storageToken =val;
     console.log("usuario desde token");
      this.miUsuario=jwt_decode(val);
      console.log(this.miUsuario);
    })

    this.userForm = this.fb.group({
      //  email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        name: ['', [Validators.required, Validators.minLength(4)]],
        lastName: ['', [Validators.required, Validators.minLength(5)]],
      });
  }

  ngOnInit() {

 
  }


  update(){
    console.log(this.userForm.value);
    this.userService.updateUser(this.userForm.value.name, this.userForm.value.lastName, this.storageToken)
    .subscribe((data:any) => {
      console.log(data);
      this.successUpdate(data.message, 'Actualizacion exitosa!');
    })
  }

  delete(user:string){
    this.userService.deleteUser(this.storageToken)
    .subscribe(data => {
      console.log(data)
      this.successUpdate(data.message, "Desactivacion exitosa");
    
        this.router.navigateByUrl("login")
     
    
    })

  }


  validar(){
    if(this.userForm.touched){
      return false;
    }else{
      return true;
    }
  }

  async successUpdate(title:string, message:string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: message,
      message: `<strong>${title}</strong>`,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });

    await alert.present();
  }


  async sureDelete( user:string){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Inactivación de cuenta',
      message: `¿Está seguro de inactivar su cuenta:  <strong>${ user }</strong> ?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: () => {
            this.delete(user);
          }
        }
      ]
    });
    alert.present();
  }


}
