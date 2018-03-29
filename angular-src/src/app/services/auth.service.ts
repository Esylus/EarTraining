import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http'; // added this
import 'rxjs/add/operator/map';               // observable map operator


@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
    .map(res => res.json());
  }

}
