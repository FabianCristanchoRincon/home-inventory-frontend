import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WishService } from 'src/app/services/list.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  products= [];

  loadProdcuts:boolean=false;

  noProdcuts:boolean=false;



  constructor( public productService:WishService, private storage:Storage , private router:Router)  {}



  ngOnInit(){
  
    this.loadProdcuts=false;
    console.log("entro al onInit tab2");
    this.storage.get('token').then((val)=>{
      this.productService.loadProducts(val)
      .then((res:any)=>{
        //console.log(res);
        this.products = res;
        console.log(this.products)
        this.loadProdcuts= true;
        if(this.products.length == 0){
          this.noProdcuts=true;
        }
      });
    })
  }



  redirectList(id: string){
    this.router.navigateByUrl("/tabs/tab1/add/"+id)
  }

  mostrar(id:string){
    this.router.navigateByUrl(`/product/${id}`);
  }
}
