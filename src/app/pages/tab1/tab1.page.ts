import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { List } from 'src/app/models/list.model';
import { WishService } from 'src/app/services/list.service';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor( public wishService:WishService,
              private router:Router,
              private alertCtrl: AlertController,
              private storage: Storage) {
                console.log("Entra constructor");
  }

  ngOnInit(){
    console.log("entra init");
    console.log(this.wishService.lists);

    this.storage.get('token').then((val)=>{
      this.wishService.loadList(val)
      .then((res)=>{
        console.log(res);
      });
    })
  }

  async addList(){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Nueva Lista',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre de la lista'
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Descripción'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: ( data ) => {
            console.log(data);
            if(data.name !== null){
              if(data.name.length === 0){
                return;
              }
            }
            

            this.wishService.createList(data.name, data.description)
            .subscribe((dataList:any)=>{
              console.log("list new: ");
              console.log(dataList.id);
              this.router.navigateByUrl(`/tabs/tab1/add/${ dataList.id }`);
            })

            // this.router.navigateByUrl(`/tabs/tab1/add/${ listId }`);

          }
        }
      ]
      // subHeader: 'Subtitle',
      // message: 'This is an alert message.',
      // buttons: ['OK']
    });

    alert.present();
  }


  async sureDelete( list:List, slidingItem: IonItemSliding){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Borrado de ítem',
      message: `¿Está seguro de borrar la lista <strong>${ list.name }</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            slidingItem.close();
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.deleteList(list);
          }
        }
      ]
    });
    alert.present();
  }


  async deleteList( list: List){
    const title = list.name;
    this.wishService.deleteList(list)
    .subscribe((res)=>{
      this.successDelete(title);
    });
    // await this.wishService.deleteList(list);
  }

  async successDelete(title:string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Eliminación Exitosa!',
      message: `La lista <strong>${title}</strong> ha sido eliminada exitosamente`,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });

    await alert.present();

    setTimeout(()=>{
      window.location.href = "/tabs/tab1";
    }, 1000)
  }

  selectedList(list: List) {
    console.log("List selected");
    console.log(list);
    this.router.navigateByUrl(`/tabs/tab1/add/${list.id}`);
  }


  async editList(list:List, slidingItem:IonItemSliding){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Editar Lista',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre de la lista',
          value: list.name
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Descripción de la lista',
          value: list.description
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Editar',
          handler: ( data ) => {
            if(data.name !== null){
              if(data.name.length === 0){
                return;
              }
            }
            

            list.name = data.name;
            list.description = data.description;
            this.wishService.editList(list.id, list.name, list.description)
            .subscribe((data:any)=>{
              if(data.ok){
                this.successEdit(data.message);
                slidingItem.close();
              }
            });
            // this.wishService.saveStorage();
          }
        }
      ]
    });

    alert.present();
  }

  async successEdit(message:any) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Edición Exitosa!',
      message: message,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });

    await alert.present();
  }

  goToCalculator(){
    this.router.navigateByUrl('/calculator');
  }


}
