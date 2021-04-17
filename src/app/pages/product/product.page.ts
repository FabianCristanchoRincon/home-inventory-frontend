import { Component, OnInit } from '@angular/core';
import { WishService } from '../../services/list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  idProduct:string ;
  storageToken:string;
  loadProduct:boolean = false;
  product;
  

  constructor(private  productService:WishService, private activatedRoute:ActivatedRoute, private storage:Storage, private router:Router) {

    this.idProduct = this.activatedRoute.snapshot.paramMap.get("id");

    this.storage
    .get("token")
    .then((val) => {
      this.storageToken = val;
      this.productService.loadProducts(this.storageToken).then((res) => {
        console.log(res);
      });
    })
    .then((val) => {
      this.loadProduct = false;
      this.productService
        .getProductById(this.idProduct, this.storageToken)
        .subscribe((data: any) => {
          this.product = data.product;
          console.log("resultado")
          console.log(data);
          this.loadProduct = true;
        });
    });
   }

  ngOnInit() {
   
  }



  mostrarLista(id:string){
    console.log(id)
    this.router.navigateByUrl("/tabs/tab1/add/"+id)
  }


  
}
