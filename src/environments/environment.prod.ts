import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  host: 'http://apinode-env.eba-pe2p3fcy.us-east-2.elasticbeanstalk.com/'
};

export function header(storageToken:string){
  const headerDict = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'x-token': storageToken
  }

  return new HttpHeaders(headerDict)
}
