import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { Router} from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService,
              private validateService: ValidateService
                ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
  // console.log(this.username);      // use to test that html and this method are hooked up
    const user = {
      username: this.username,
      password: this.password
    }

    if(! this.validateService.validateLogin(user)){
      console.log('Please fill in all the fields');
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

      this.authService.authenticateUser(user).subscribe(data => {
        if(data.success){
          this.authService.storeUserDate(data.token, data.user);
          this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['dashboard']);
        } else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['login']);
          }

      });

  }


}
