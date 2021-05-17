import { Injectable, OnInit } from "@angular/core";
import { List } from "../models/list.model";
import { HttpClient } from "@angular/common/http";
import { Storage } from '@ionic/storage';
import { header } from '../../environments/environment';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class WishService implements OnInit {
  lists: List[] = [];
  products = [];
  env = environment.host;

  storageToken: string = '';

  constructor(private http: HttpClient,
    private storage:Storage) {
      this.storage.get('token').then((val)=>{
        this.storageToken = val;
      })
    // this.loadStorage();
  }

  ngOnInit(){
    this.storage.get('token').then((val)=>{
      this.storageToken = val;
    })
  }

  loadList(token:string){
    return new Promise((res, rej)=>{
      
      this.storageToken = token;
  
      this.http.get(this.env + "list/activeLists", {headers: header(this.storageToken)})
      .subscribe((data:any)=> {
        this.lists = data.lists;
        console.log(this.lists);
        res("ok");
      });
    })
  }


  loadProducts(token:string){
    return new Promise((res, rej)=>{
      this.storageToken = token;
      console.log("loadproduct");
      this.http.get(this.env  +"product/products", {headers: header(token)})
      .subscribe((data:any)=> {
        this.products = data.result;
        //console.log(this.products)
        res(this.products);
      });
    })
  }


  createList(name: string, description:string) {
    let list = new URLSearchParams();
    list.set('name', name);
    list.set('description', description);

    return this.http.post(this.env +'list/create', list.toString(), {headers: header(this.storageToken)});

    // const newList = new List(title);
    // this.lists.push(newList);
    // this.saveStorage();

    // return newList.id;
  }

  createProduct(name:string, description:string, price, quantity, list_id){
    let product = new URLSearchParams();
    product.set('name', name);
    product.set('description', description);
    product.set('price', price);
    product.set('quantity', quantity);
    product.set('list_id', list_id);

    return this.http.post(this.env  +'product/create_new', product.toString(), {headers: header(this.storageToken)});
  }

  editList(id, name:string, description){
    let list = new URLSearchParams();
    list.set('id', id);
    list.set('name', name);
    list.set('description', description);


    return this.http.put(this.env +'list/update', list.toString(), {headers: header(this.storageToken)});
  }

  deleteList(list: List) {
    console.log(list);
    let body = new URLSearchParams();
    body.set('id', ""+list.id);
    return this.http.post(this.env +"list/delete", body.toString(), {headers: header(this.storageToken)})
  }

  deleteProductFromList(id_list:number, id_product:number){
    let body = new URLSearchParams();
    body.set('list_id', ""+id_list);
    body.set('product_id', ""+id_product);
    return this.http.post(this.env +"product/deleteFromList", body.toString(), {headers: header(this.storageToken)})
  }

  getList(id: string | number, storageToken:string) {
    return this.http.get(`${this.env}list/listById/${id}`, {headers: header(storageToken)})
  }

  //  Cuando hago un refresh
  saveStorage() {
    localStorage.setItem("data", JSON.stringify(this.lists));
  }

  //  Cuando aplicación carga por primera vez
  loadStorage() {
    if (localStorage.getItem("data")) {
      this.lists = JSON.parse(localStorage.getItem("data"));
    } else {
      this.lists = [];
    }
  }


  getProductById(id:string, storageToken:string){

    return this.http.get(`${this.env}product/productsById/${id}`,{headers: header(storageToken)})
  }


}
