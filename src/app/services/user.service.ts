import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { header } from '../../environments/environment';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.host +"user";
  token: string = null;

  constructor(private http: HttpClient,
    private storage: Storage) { }

    login(username:string, password:string){
      const data = {username, password}

    return new Promise(resolve => (

      this.http.post(`${this.baseUrl}/login`, data)
        .subscribe(res => {
          console.log(res)

          if (res['ok']) {
            this.saveToken(res['token'])
            resolve(res)
          } else {
            this.token = null
            this.storage.clear();
            resolve(false)
          }

        })
    ));

  }

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', token)
  }


    register(name:string, lastname:string, email:string, username:string, password:string, avatar:string){
      const data = {name, lastname, email, username, password, avatar}
      return new Promise(
        resolve => (
          this.http.post(`${this.baseUrl}/create`, data )
          .subscribe( res => {
            console.log(res)
            resolve(res)
          })
      ));
  }

  deleteUser( token: string): Observable<any> {
    return this.http.delete( this.baseUrl+'/delete', {headers: header(token)});
  }

  updateUser(name:string, lastName:string, storageToken:string){
    let user = new URLSearchParams();
    user.set('name', name);
    
    user.set('lastname', lastName);
    console.log(storageToken);
    return this.http.put(this.baseUrl +'/update', user.toString(),  {headers: header(storageToken)});
  }

  getUser(id: string): Observable<any> {
    return this.http.get(this.baseUrl + id);
  }
}
