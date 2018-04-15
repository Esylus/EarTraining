import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http'; 
import 'rxjs/add/operator/map'; 

@Injectable()
export class SendMsgService {

  constructor(private http:Http) { }

  sendMessage(message){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('send', message, {headers: headers})
    .map(res => res.json());
  }

}
