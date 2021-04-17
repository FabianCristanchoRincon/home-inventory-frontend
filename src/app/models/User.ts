export class User {

     _id?: number;
     name: string;
     lastName: string;
     email: string; 
     username: string; 
     password: string;
     
     constructor(name: string, lastName: string, email: string, username:string, password: string){
          this.name = name;
          this.password = password;
          this.email = email;
          this.username = username;
          this.password = password;
     }
}