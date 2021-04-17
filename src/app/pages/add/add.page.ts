import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, IonItemSliding } from "@ionic/angular";
import { ListItem } from "src/app/models/list-item.model";
import { List } from "src/app/models/list.model";
import { WishService } from "src/app/services/list.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-add",
  templateUrl: "./add.page.html",
  styleUrls: ["./add.page.scss"],
})
export class AddPage implements OnInit {
  list: List;
  itemName = "";
  loadList: boolean = false;
  storageToken: string = "";
  listId;

  constructor(
    private wishService: WishService,
    private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController,
    private storage: Storage,
    private router: Router
  ) {
    console.log('Constr');
    this.loadList = false;
    // const listId = this.activatedRoute.params.subscribe( param => param['listId'])
    // Otra manera
    this.listId = this.activatedRoute.snapshot.paramMap.get("listId");

    this.storage
      .get("token")
      .then((val) => {
        this.storageToken = val;
        this.wishService.loadList(this.storageToken).then((res) => {
          console.log(res);
        });
      })
      .then((val) => {
        this.loadList = false;
        this.wishService
          .getList(this.listId, this.storageToken)
          .subscribe((data: any) => {
            this.list = data.resultList;
            console.log(this.list);
            this.loadList = true;
          });
      });
  }

  ngOnInit() {
  }

  async addProduct() {
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: "Nuevo Producto",
      inputs: [
        {
          name: "name",
          type: "text",
          placeholder: "Nombre del producto",
        },
        {
          name: "description",
          type: "text",
          placeholder: "Descripción",
        },
        {
          name: "price",
          type: "text",
          placeholder: "Precio",
        },
        {
          name: "quantity",
          type: "text",
          placeholder: "Cantidad",
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log("Cancelar");
          },
        },
        {
          text: "Crear",
          handler: (data) => {
            console.log(data);
            if(data.name !== null){
              if (data.name.length === 0) {
                return;
              }
            }
            

            this.wishService
              .createProduct(
                data.name,
                data.description,
                data.price,
                data.quantity,
                this.listId
              )
              .subscribe(async (product: any) => {
                const alert = await this.alertCtrl.create({
                  cssClass: "alert",
                  header: product.message,
                  buttons: ["OK"],
                });
                alert.present();
                setTimeout(() => {
                  window.location.href = `/tabs/tab1/add/${this.listId}`;
                }, 500);
              });
          },
        },
      ],
    });

    alert.present();
  }

  addItem() {
    if (!this.itemName) {
      return;
    }
    const newItem = new ListItem(this.itemName);
    this.list.items.push(newItem);

    this.itemName = "";
    this.wishService.saveStorage();
  }

  changeCheckbox(item: ListItem) {
    // const pending = this.list.items.filter((itemData) => !itemData.complete)
    //   .length;

    // if (pending === 0) {
    //   this.list.finishedAt = new Date();
    //   this.list.complete = true;
    // } else {
    //   this.list.finishedAt = null;
    //   this.list.complete = false;
    // }

    this.wishService.saveStorage();
  }

  async delete(id_list: number, id_product: number, name_product: string) {
    console.log("Id list: " + id_list);
    console.log("Id product: " + id_product);
    this.wishService
      .deleteProductFromList(id_list, id_product)
      .subscribe((data: any) => {
        if (data.ok) {
          this.deletedItem(name_product);
        }
      });
  }

  async sureDelete(
    id_list: number,
    id_product: number,
    name_product: string,
    slidingItem: IonItemSliding
  ) {
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: "Borrado de ítem",
      message: `¿Está seguro de borrar el ítem <strong>${name_product}</strong> de la lista?`,
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            slidingItem.close();
          },
        },
        {
          text: "Confirmar",
          handler: () => {
            this.delete(id_list, id_product, name_product);
          },
        },
      ],
    });

    await alert.present();
  }

  async deletedItem(desc: string) {
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: "Borrado exitoso!",
      message: `El producto <strong>${desc}</strong> fue borrado de la lista con éxito`,
      buttons: [
        {
          text: "De acuerdo",
        },
      ],
    });

    await alert.present();
    setTimeout(() => {
      window.location.href = `/tabs/tab1/add/${this.listId}`
    }, 1000)
  }

  async viewProduct(product: number, slidingItem: IonItemSliding) {


    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: "Vista de producto!",
      message: ""+product,
      buttons: [
        {
          text: "De acuerdo",
        },
      ],
    });

    await alert.present();

  
  this.router.navigateByUrl(`/product/${product}`);
 //   this.router.navigateByUrl('/product')
  }

  
}
